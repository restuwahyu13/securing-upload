import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'
import { IUploads } from '@interfaces/interface.uploads'

class DatabaseSchema {
  @Index()
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', nullable: false, length: 50 })
  name!: string

  @Column({ type: 'varchar', nullable: false, length: 50 })
  type!: string

  @Column({ type: 'text', nullable: false })
  link!: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at?: Date
}

@Entity()
export class Uploads extends DatabaseSchema implements IUploads {}
