import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt"
import { UserEntity } from "../user/entity/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { UpdatePatchUserDTO } from "../user/dto/update-patch-user.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserService } from "../user/user.service";


@Injectable()
export class AuthService {

    constructor(
        private readonly JwtService: JwtService, 
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private readonly userService: UserService
        ){}

    async createToken(user: UserEntity) {
        const accessToken = this.JwtService.sign({}, { expiresIn: "7 days", subject: String(user.id), issuer: "API NestJS"});

        return {
            id: user.id,
            name: user.nome,
            email: user.email,
            accessToken
        } 
    }

    verifyToken(token: string){
        try{
            return this.JwtService.verify(token)
        }catch (e){
            throw new BadRequestException(e);
        }
    }

    isValidToken(token: string): boolean{
        try{
            this.JwtService.verify(token)
            return true
        }catch (e){
            return false
        }
    }

    async login({ email, password }: AuthLoginDTO){

        const user = await this.userService.existsUser(email)

        if(!user){
            throw new UnauthorizedException('E-mail ou/e senha incorretos!')
        }

        const isAuthenticated = await bcrypt.compare(password, user.password)

        if(!isAuthenticated){
            throw new UnauthorizedException('E-mail ou/e senha incorretos!')
        }

        return this.createToken(user)

    }

    async register(data: AuthRegisterDTO){
        
        const user = await this.userService.create(data)

        return this.createToken(user)

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