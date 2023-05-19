import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './domain/user/user.module';
import { AuthModule } from './domain/auth/auth.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from './domain/user/entity/user.entity';
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from '@nestjs/throttler';




@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({ ttl: 60, limit: 10 }),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserEntity],
      synchronize: process.env.ENV === 'development',

  })
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}