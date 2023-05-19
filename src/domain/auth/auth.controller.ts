import { BadRequestException, Body, Controller, Headers, Post,  UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthService } from "./auth.service";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { AuthGuard } from "../../guards/auth.guard";
import { User } from "src/decorators/user.decorator";
import { UserEntity } from "../user/entity/user.entity";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { join } from "path";
import { FileService } from "../file/file.service";


@UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {

    constructor(private readonly fileService: FileService, private readonly authService: AuthService){}

    @Post('login')
    async login(@Body() data: AuthLoginDTO){
        return this.authService.login(data);
    }

    
    @Post('register')
    async register(@Body() data: AuthRegisterDTO){
        return this.authService.register(data);
    }

    @Post('forget')
    async forget(@Body() { email }: AuthForgetDTO){
        return this.authService.forget(email)
    }

    @Post('reset')
    async reset(@Body() { password, token }: AuthResetDTO){
        return this.authService.reset(password, token)
    }

    @Post('verify')
    async verifyToken(@Headers('authorization') token){
        return this.authService.verifyToken((token ?? '').split(' ')[1])
    }

    @Post('valid')
    async isValidToken(@User() user: UserEntity){
        return user
    }

    @UseInterceptors(FileInterceptor('file'))
    @Post('photo')
    async uploadPhoto(@User() user: UserEntity, @UploadedFile() photo: Express.Multer.File){

        try{
            const path = join(__dirname, '..', '..', '..', '..', 'storage', 'photos', `photo-${user.id}.png`)

            await this.fileService.upload(photo, path)
        }catch(e){
            throw new BadRequestException(e)
        }
    }

    @UseInterceptors(FilesInterceptor('files'))
    @Post('photo')
    async uploadPhotos(@User() user: UserEntity, @UploadedFiles() photo: Express.Multer.File){

        try{
            const path = join(__dirname, '..', '..', '..', '..', 'storage', 'photos', `photo-${user.id}.png`)

            await this.fileService.upload(photo, path)
        }catch(e){
            throw new BadRequestException(e)
        }
    }

}