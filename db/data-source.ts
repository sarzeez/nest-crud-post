import { PostEntity } from '@/features/post/entity/post.dto';
import { User } from '@/features/user/entity/user.entity';
import { config } from 'dotenv';
config();

import { DataSourceOptions, DataSource } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [PostEntity, User],
  synchronize: true,
};

export default new DataSource(dataSourceOptions);
