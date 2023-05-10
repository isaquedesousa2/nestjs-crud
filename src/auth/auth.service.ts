import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt"


@Injectable()
export class AuthService {

    constructor(private readonly JWTSerivce: JwtService){}

    async createToken() {
        // return this.JWTSerivce.sign();
    }

    async checkToken(token: string){
        // return this.jwtService.verify()
    }

    async login(email: string, passowrd: string){}

    async forget(){}

    async reset(){}
}