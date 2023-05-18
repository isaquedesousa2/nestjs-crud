import { Body, Controller, Post } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(private readonly userService: UserService, private readonly authService: AuthService){}

    @Post('login')
    async login(@Body() data: AuthLoginDTO){
        return this.authService.login(data);
    }

    @Post('register')
    async register(@Body() data: AuthRegisterDTO){
        return this.userService.create(data);
    }

    @Post('forget')
    async forget(@Body() body: AuthForgetDTO){
        return body;
    }

    @Post('reset')
    async reset(@Body() body: AuthForgetDTO){
        return body;
    }

}