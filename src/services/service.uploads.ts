import { StatusCodes as status } from 'http-status-codes'

import { Uploads } from '@entities/entitie.uploads'
import { Inject, Repository, Service } from '@helpers/helper.di'
import { apiResponse, APIResponse } from '@helpers/helper.apiResponse'
import { DTOUploads, DTOUploadsId, DTOUploadsName } from '@dtos/dto.uploads'
import { cryptoDecrypt } from '@libs/lib.crypto'
import { caesarDecrypt } from '@helpers/helper.caesarCipher'
import { RabbitMQ } from '@libs/libs.rabbitmq'

@Service()
export class UploadsService {
  constructor(@Inject('UploadsModel') private model: Repository<Uploads>) {}

  async createImage(body: DTOUploads, file: Express.MulterS3.File): Promise<APIResponse> {
    try {
      const pub: boolean = await new RabbitMQ('file', 'stream').publisher({ ...file, ...body })
      if (!pub) throw apiResponse(status.FORBIDDEN, 'Uploading new file failed')

      return apiResponse(status.OK, 'Upload new file success')
    } catch (e: any) {
      return apiResponse(e.stat_code || status.BAD_REQUEST, e.stat_msg || e.message)
    }
  }

  async getAllImages(): Promise<APIResponse> {
    try {
      const getAllImages: Uploads[] = await this.model.find()

      return apiResponse(status.OK, 'Images already to use', getAllImages, null)
    } catch (e: any) {
      return apiResponse(e.stat_code || status.BAD_REQUEST, e.stat_msg || e.message)
    }
  }

  async getImageById(params: DTOUploadsId): Promise<APIResponse> {
    try {
      const getImage: Uploads = await this.model.findOne({ id: params.id })
      if (!getImage) throw apiResponse(status.NOT_FOUND, `Filename not exist for this id ${params.id}`)

      return apiResponse(status.OK, 'Image already to use', getImage, null)
    } catch (e: any) {
      return apiResponse(e.stat_code || status.BAD_REQUEST, e.stat_msg || e.message)
    }
  }

  async getViewImageById(params: DTOUploadsName): Promise<APIResponse> {
    try {
      const getImage: Uploads = await this.model.findOne({ name: params.name })
      if (!getImage) throw apiResponse(status.NOT_FOUND, `Filename not exist for this name ${params.name}`)

      const rotateData: string = caesarDecrypt(getImage.link, 20)
      const decryptData: string = cryptoDecrypt(rotateData)

      return apiResponse(status.OK, 'Image already to use', { link: caesarDecrypt(decryptData, 20) }, null)
    } catch (e: any) {
      return apiResponse(e.stat_code || status.BAD_REQUEST, e.stat_msg || e.message)
    }
  }
}
