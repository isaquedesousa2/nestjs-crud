import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user/entity/user.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({
            secret: 'FTZfxvXz4^EZ*M$j9Q!w8$4^*s6sRXas'
        })
    ],
    controllers: [AuthController]
})
export class AuthModel {}