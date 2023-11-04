import envConfig from 'src/config/env';
import { DataSource } from 'typeorm';

const typeOrmConfig = {
  type: envConfig.PSQL_DATABASE_TYPE as 'postgres',
  host: envConfig.PSQL_DATABASE_HOST,
  port: envConfig.PSQL_DATABASE_PORT,
  username: envConfig.PSQL_DATABASE_USERNAME,
  password: envConfig.PSQL_DATABASE_PASSWORD,
  database: envConfig.PSQL_DATABASE_NAME,
  synchronize: envConfig.TYPEORM_SYNC,
  migrationsRun: envConfig.MIGRATIONS_RUN,
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  migrations: ['dist/config/database/typeorm/migrations/**/*.js'],

  seeds: ['src/config/database/typeorm/seeds/create.seeds.ts'],
  factories: ['src/config/database/typeorm/factories/create.factory.ts'],
};

export const connectionSource = new DataSource({ ...typeOrmConfig });
export default typeOrmConfig;
