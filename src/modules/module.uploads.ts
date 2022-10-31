import { Module, Injectable, Inject, Context, ObjectLiteral } from '@helpers/helper.di'
import { UploadsService } from '@services/service.uploads'
import { UploadsController } from '@controllers/controller.uploads'
import { UploadsRoute } from '@routes/route.uploads'
import { UploadsModel } from '@models/model.uploads'

@Module([
  { token: 'UploadsService', useClass: UploadsService },
  { token: 'UploadsController', useClass: UploadsController },
  { token: 'UploadsRoute', useClass: UploadsRoute },
  {
    token: 'UploadsModel',
    useFactory: (): ObjectLiteral => {
      return Context.get(UploadsModel).model
    }
  }
])
@Injectable()
export class UploadsModule {
  constructor(@Inject('UploadsRoute') public route: UploadsRoute) {}
}
