const path = require('path')

const pathEntitiesDir = !['production'].includes(process.env.NODE_ENV) ? 'src/entities/*.ts' : 'dist/entities/*.js'
const pathMigrationDir = !['production'].includes(process.env.NODE_ENV) ? 'src/database/migrations/*.ts' : 'dist/database/migrations/*.ts'

const entitiesDir = path.join(__dirname, pathEntitiesDir)
const migrationsDir = path.join(__dirname, pathMigrationDir)

module.exports = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: +process.env.PG_PORT,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DBNAME,
  entities: [entitiesDir],
  migrations: [migrationsDir],
  synchronize: !['production'].includes(process.env.NODE_ENV) ? true : false,
  logger: !['production'].includes(process.env.NODE_ENV) ? 'advanced-console' : undefined,
  logging: !['production'].includes(process.env.NODE_ENV) ? true : false,
  cli: {
    entitiesDir: entitiesDir,
    migrationsDir: migrationsDir
  }
}
