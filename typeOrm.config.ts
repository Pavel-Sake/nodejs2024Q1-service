import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

const entitiesPath = __dirname + '/../../entity/*{.js}';

export const dbDataSource: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  entities: [entitiesPath],
  migrations: ['migrations/**'],
};

const dataSource = new DataSource(dbDataSource);

export default dataSource;
