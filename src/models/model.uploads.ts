import { Model, InjectRepository, Repository } from '@helpers/helper.di'
import { Uploads } from '@/entities/entitie.uploads'

@Model()
export class UploadsModel {
  constructor(@InjectRepository(Uploads) public model: Repository<Uploads>) {}
}
