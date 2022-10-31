import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class uploads1667133966177 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'uploads',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
            isUnique: true,
            unsigned: true
          },
          {
            name: 'name',
            type: 'varchar',
            length: '50',
            isUnique: true,
            isNullable: false
          },
          {
            name: 'link',
            type: 'text',
            isNullable: false
          },
          {
            name: 'type',
            type: 'varchar',
            length: '50',
            isNullable: false
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP'
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('uploads')
  }
}
