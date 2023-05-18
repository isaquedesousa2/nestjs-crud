import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt"
import { UserEntity } from "../user/entity/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import { AuthLoginDTO } from "./dto/auth-login.dto";


@Injectable()
export class AuthService {

    constructor(private readonly JWTSerivce: JwtService, @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>){}

    async createToken() {
        // return this.JWTSerivce.sign();
    }

    async checkToken(token: string){
        // return this.jwtService.verify()
    }

    async login({ email, password }: AuthLoginDTO){
        const salt = await bcrypt.genSalt();
        password = await bcrypt.hash(password, salt);

        const user = await this.userRepository.exist({ where: { email, password }})

        if(user){
            return "Usuário logado!"
        }

        return "Usuário não logado!"

    }

    async forget(){}

    async reset(){}
}