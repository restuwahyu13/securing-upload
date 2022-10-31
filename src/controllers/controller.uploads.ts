import { Request, Response, Handler, NextFunction } from 'express'
import { OutgoingMessage } from 'http'

import { UploadsService } from '@services/service.uploads'
import { Controller, Inject } from '@helpers/helper.di'
import { APIResponse } from '@helpers/helper.apiResponse'
import { rawParser } from '@helpers/helper.rawParser'

@Controller()
export class UploadsController {
  constructor(@Inject('UploadsService') private service: UploadsService) {}

  createImage(): Handler {
    return async (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const response: APIResponse = await this.service.createImage(rawParser(req.body), req.file as Express.MulterS3.File)
        return res.status(response.stat_code).json(response)
      } catch (e: any) {
        return res.status(e.stat_code).json(e)
      }
    }
  }

  getAllImages(): Handler {
    return async (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const response: APIResponse = await this.service.getAllImages()
        return res.status(response.stat_code).json(response)
      } catch (e: any) {
        return res.status(e.stat_code).json(e)
      }
    }
  }

  getImageById(): Handler {
    return async (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const response: APIResponse = await this.service.getImageById(req.params as any)
        return res.status(response.stat_code).json(response)
      } catch (e: any) {
        return res.status(e.stat_code).json(e)
      }
    }
  }

  getViewImageById(): Handler {
    return async (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const response: APIResponse = await this.service.getViewImageById(req.params as any)
        return res.status(response.stat_code).send(`<img src="${response.data['link']}"/>`)
      } catch (e: any) {
        return res.status(e.stat_code).json(e)
      }
    }
  }
}
