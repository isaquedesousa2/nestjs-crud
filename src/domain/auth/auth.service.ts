import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt"
import { UserEntity } from "../user/entity/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { UpdatePatchUserDTO } from "../user/dto/update-patch-user.dto";


@Injectable()
export class AuthService {

    constructor(private readonly JwtService: JwtService, @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>){}

    async createToken(user: UserEntity) {
        return this.JwtService.sign({}, { expiresIn: "7 days", subject: String(user.id), issuer: "API NestJS"});
    }

    async checkToken(token: string){
        // return this.jwtService.verify()
    }

    async login({ email, password }: AuthLoginDTO){
        
        const user = await this.userRepository.findOne({ where: { email }})

        const isAuthenticated = await bcrypt.compare(password, user.password)

        if(!isAuthenticated){
            throw new UnauthorizedException('E-mail ou/e senha incorretos!')
        }

        return user

    }

    async forget(email: string){
        const user = await this.userRepository.findOne({ where: { email }})

        if(!user){
            throw new UnauthorizedException('E-mail está incorreto!')
        }

        return this.createToken(user)
    }

    async reset(password: string, token: string){
        // const data: UserEntity = {}
        // const id = 10;

        // data.password = password
        // const user = await this.userRepository.update(id, data)

        // return this.createToken(user)
    }
}