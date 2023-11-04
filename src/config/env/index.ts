import * as env from 'env-var';
import { config } from 'dotenv';

config();

const PORT = env.get('PORT').asInt();
const NODE_ENV = env.get('NODE_ENV').asString();

const PSQL_DATABASE_TYPE =
  env.get('PSQL_DATABASE_TYPE').required().asString() || 'postgres';
const PSQL_DATABASE_DRIVER = env
  .get('PSQL_DATABASE_DRIVER')
  .required()
  .asString();
const PSQL_DATABASE_HOST = env.get('PSQL_DATABASE_HOST').required().asString();
const PSQL_DATABASE_PORT = env.get('PSQL_DATABASE_PORT').required().asInt();
const PSQL_DATABASE_USERNAME = env
  .get('PSQL_DATABASE_USERNAME')
  .required()
  .asString();
const PSQL_DATABASE_PASSWORD = env
  .get('PSQL_DATABASE_PASSWORD')
  .required()
  .asString();
const PSQL_DATABASE_NAME = env.get('PSQL_DATABASE_NAME').required().asString();
const TYPEORM_SYNC = env.get('TYPEORM_SYNC').required().asBool();
const MIGRATIONS_RUN = env.get('MIGRATIONS_RUN').asBool();

const DUPLO_PLATFORM_CODE = env
  .get('DUPLO_PLATFORM_CODE')
  .required()
  .asString();
const TAX_API_URL = env.get('TAX_API_URL').required().asString();
const MONGODB_CONNECTION_STRING = env
  .get('MONGODB_CONNECTION_STRING')
  .required()
  .asString();

const envConfig = {
  NODE_ENV,
  PORT,
  PSQL_DATABASE_TYPE,
  PSQL_DATABASE_DRIVER,
  PSQL_DATABASE_HOST,
  PSQL_DATABASE_PORT,
  PSQL_DATABASE_USERNAME,
  PSQL_DATABASE_PASSWORD,
  PSQL_DATABASE_NAME,
  TYPEORM_SYNC,
  MIGRATIONS_RUN,
  DUPLO_PLATFORM_CODE,
  TAX_API_URL,
  MONGODB_CONNECTION_STRING,
};

export default envConfig;
