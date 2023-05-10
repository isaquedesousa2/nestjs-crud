import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";


@Module({
    imports: [
        JwtModule.register({
            secret: 'FTZfxvXz4^EZ*M$j9Q!w8$4^*s6sRXas'
        })
    ],
    controllers: [AuthController]
})
export class AuthModel {}