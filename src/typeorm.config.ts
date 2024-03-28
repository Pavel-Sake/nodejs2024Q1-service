import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const entitiesPath = __dirname + '/../entity/*{.js,.ts}';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [entitiesPath],
  synchronize: false,
  autoLoadEntities: true,
};
