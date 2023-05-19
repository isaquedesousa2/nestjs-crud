import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "../domain/auth/auth.service";
import { UserService } from "src/domain/user/user.service";


@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(private readonly authService: AuthService, private readonly userService: UserService){}
    
    async canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest();

        try{

            const { authorization } = request.headers;

            const data =  this.authService.verifyToken((authorization ?? '').split(' ')[1])

            request.user = await this.userService.show(data.sub)

            return true

        }catch(e){
            return false
        }

    }
}