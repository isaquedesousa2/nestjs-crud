import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/enums/role.enum";


@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private readonly reflector: Reflector){}

    async canActivate(context: ExecutionContext) {

        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [context.getHandler(), context.getClass()])
        
        const { user } = context.switchToHttp().getRequest();
        
        const roles = requiredRoles.filter(role => role === user.role) 

        return roles.length > 0
    }
}