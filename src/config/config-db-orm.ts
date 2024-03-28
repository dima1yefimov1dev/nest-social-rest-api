import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Comment } from 'src/comments/comments-entity';
import { Post } from 'src/posts/posts-entity';
import { User } from 'src/users/users.entity';

export default registerAs(
  'db-config',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Post, Comment],
    synchronize: true,
  }),
);
