import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user/entity/user.entity";
import { UserModule } from "../user/user.module";
import { AuthService } from "./auth.service";
import { FileService } from "../file/file.service";
import { FileModule } from "../file/file.module";


@Module({
    imports: [
        FileModule,
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({
            secret: 'FTZfxvXz4^EZ*M$j9Q!w8$4^*s6sRXas'
        }),
        forwardRef(()=> UserModule)
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}