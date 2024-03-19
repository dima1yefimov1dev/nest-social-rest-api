import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from './events/events.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import configDbOrm from './config/config-db-orm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configDbOrm],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: configDbOrm,
    }),
    EventsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
