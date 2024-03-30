import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import configDbOrm from './config/config-db-orm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { PaginationModule } from './pagination/pagination.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configDbOrm],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: configDbOrm,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
