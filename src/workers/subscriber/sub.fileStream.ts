import 'dotenv/config'
import os from 'os'
import path from 'path'
import { StatusCodes as status } from 'http-status-codes'
import { createConnection, ConnectionOptions, Repository, getConnection, getConnectionManager, getConnectionOptions, Connection } from 'typeorm'

import { Uploads } from '@entities/entitie.uploads'
import { fileStream } from '@helpers/helper.fileStream'
import { RabbitMQ } from '@libs/libs.rabbitmq'
import { cryptoEncrypt } from '@libs/lib.crypto'
import { apiResponse } from '@helpers/helper.apiResponse'
import { caesarEncrypt } from '@helpers/helper.caesarCipher'

/**
@description Filestream subscriber for transform image cdn to base64Url
*/
;(() => {
  new RabbitMQ('file', 'stream').subscriber(async (content: any, error: Error) => {
    try {
      if (!error && content) {
        let connection: Connection

        if (!getConnectionManager().has('default')) {
          const connectionOptions: ConnectionOptions = await getConnectionOptions()
          connection = await createConnection(connectionOptions)
        } else {
          connection = getConnection()
        }

        const model: Repository<Uploads> = connection.manager.getRepository(Uploads)
        const base64Url: string = await fileStream(content.location, os.tmpdir())
        const filename: string = path.basename(content.originalname).split('.')[0].replace(/[\s]/gi, '-')

        const checkImageName: Uploads = await model.findOne({ name: filename, type: 'content.type' })
        if (checkImageName) throw apiResponse(status.CONFLICT, `Filename ${filename} already exist`)

        const encryptData: string = cryptoEncrypt(base64Url)
        const rotateData: string = caesarEncrypt(encryptData, 20)

        const uploads: Uploads = model.create({ name: filename, type: 'content.type', link: rotateData })
        const addImage: Uploads = await model.save(uploads)
        if (!addImage) throw apiResponse(status.FORBIDDEN, 'Uploading new file failed')
      }
    } catch (e: any) {
      console.error(`Filestream worker error: ${e.message}`)
    }
  })
})()
