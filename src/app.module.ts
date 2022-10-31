import { Container, Injectable, Module, Router } from '@helpers/helper.di'
import { ValidatorMiddleware } from '@middlewares/middleware.validator'
import { UploadsModule } from '@modules/module.uploads'

@Module([
  { token: 'ValidatorMiddleware', useClass: ValidatorMiddleware },
  {
    token: 'UploadsModule',
    useFactory: (): Router => {
      return Container.resolve(UploadsModule).route.main()
    }
  }
])
@Injectable()
export class AppModule {}
