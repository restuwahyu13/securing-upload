import aws from 'aws-sdk'
import { Request } from 'express'
import multer from 'multer'
import multerS3 from 'multer-s3'
import fs from 'fs'
import os from 'os'

import { mimeTypeSupport } from '@helpers/helper.mimeType'

aws.config.update({
  apiVersion: '2010-12-01',
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  hostPrefixEnabled: true,
  computeChecksums: true,
  correctClockSkew: true,
  region: process.env.S3_REGION
})

export class Multer {
  private static diskStorage: multer.StorageEngine = multer.diskStorage({
    destination(_: Request, file: Express.Multer.File, done: any) {
      let defaultDir: string = os.tmpdir()

      if (!file) {
        done(new Error('Uploading file failed'), null)
      } else {
        if (process.platform === 'win32') {
          if (fs.existsSync(defaultDir)) {
            done(null, defaultDir)
          } else {
            done(new Error('No such file directory').message, null)
          }
        } else {
          if (fs.existsSync(defaultDir)) {
            done(null, defaultDir)
          } else {
            done(new Error('No such file directory').message, null)
          }
        }
      }
    },
    filename(_req: Request, file: Express.Multer.File, done: any) {
      if (!file) done(new Error('Uploading file failed'), null)
      const fileName: string = `${Date.now()}.${file.originalname.split('.')[1]}`
      done(null, fileName)
    }
  })

  private static awsStorage: multer.StorageEngine = multerS3({
    s3: new aws.S3(),
    bucket: process.env.S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    serverSideEncryption: 'AES256',
    acl: 'public-read',
    metadata(_req: Request, file: Express.Multer.File, done: any) {
      if (!file) done(new Error('Uploading file failed'), null)
      done(null, file)
    },
    key: function (_req: Request, file: Express.Multer.File, done: any) {
      const fileName: string = `${Date.now()}.${file.originalname.split('.')[1]}`
      done(null, fileName)
    }
  })

  private static fileFilter(_req: Request, file: Express.Multer.File, done: any) {
    if (!mimeTypeSupport(file.mimetype)) throw new Error('mimetype not supported')
    if (file.size >= 5242880) throw new Error('maximum file or image size must be 5 MB or under 5 MB')

    const fileName: string = `${Date.now()}.${file.originalname.split('.')[1]}`
    done(null, fileName)
  }

  static upload: multer.Multer = multer({ storage: Multer.awsStorage, limits: { fileSize: 5242880 }, fileFilter: Multer.fileFilter })
}
