import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator'

export class DTOUploads {
  @IsOptional()
  @IsNumberString()
  id?: string

  @IsNotEmpty()
  @IsString()
  file!: string

  @IsNotEmpty()
  @IsString()
  type!: string
}

export class DTOUploadsId {
  @IsOptional()
  @IsNumberString()
  id: number
}

export class DTOUploadsName {
  @IsOptional()
  @IsString()
  name: string
}
