import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './domain/user/user.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from './domain/user/entity/user.entity';


@Module({
  imports: [UserModule,
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
