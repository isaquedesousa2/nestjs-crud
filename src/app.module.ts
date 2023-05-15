import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './domain/user/user.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from './domain/user/entity/user.entity';

console.log(process.env.DB_HOST)
console.log(process.env.DB_PORT)
console.log(process.env.DB_USERNAME)
console.log(process.env.DB_PASSWORD)
console.log(process.env.DB_DATABASE)


@Module({
  imports: [UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "api",
      entities: [UserEntity],
      synchronize: process.env.ENV === 'development',

  })
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
