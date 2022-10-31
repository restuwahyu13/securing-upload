import { Inject, Route, Router } from '@helpers/helper.di'
import { UploadsController } from '@controllers/controller.uploads'
import { ValidatorMiddleware } from '@middlewares/middleware.validator'
import { Multer } from '@libs/lib.multer'
import { DTOUploadsId, DTOUploadsName } from '@dtos/dto.uploads'

@Route()
export class UploadsRoute {
  private router: Router

  constructor(@Inject('UploadsController') private controller: UploadsController, @Inject('ValidatorMiddleware') private validator: ValidatorMiddleware) {
    this.router = Router({ strict: true, caseSensitive: true })
  }

  main(): Router {
    this.router.post('/', [Multer.upload.single('file')], this.controller.createImage())
    this.router.get('/', this.controller.getAllImages())
    this.router.get('/:id', [this.validator.use(DTOUploadsId)], this.controller.getImageById())
    this.router.get('/view/:name', [this.validator.use(DTOUploadsName)], this.controller.getViewImageById())

    return this.router
  }
}
