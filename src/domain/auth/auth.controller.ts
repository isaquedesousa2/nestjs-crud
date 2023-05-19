import { Body, Controller, Headers, Post } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { AuthResetDTO } from "./dto/auth-reset.dto";

@Controller('auth')
export class AuthController {

    constructor(private readonly userService: UserService, private readonly authService: AuthService){}

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
    async isValidToken(@Body('token') token: string){
        return this.authService.isValidToken(token)
    }

}