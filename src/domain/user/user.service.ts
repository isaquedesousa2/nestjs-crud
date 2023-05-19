import { BadRequestException, Injectable } from "@nestjs/common";
import { UserEntity } from "./entity/user.entity";
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDTO } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";


@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>){}

    async existsUser(email: string) {
        const user = await this.userRepository.findOne({ where: { email }});
        return user;
    }

    async create(data: CreateUserDTO){
        const existUser = await this.existsUser(data.email)

        if(existUser) {
            throw new BadRequestException('E-mail já cadastrado!')
        }

        const salt = await bcrypt.genSalt();

        data.password = await bcrypt.hash(data.password, salt);

        if (data.birthAt === undefined) {
            data.birthAt = '1900-01-01';
        }

        if(data.role === undefined){
            data.role = 1;
        }
        

        const user = this.userRepository.create(data)

        return this.userRepository.save(user)
    }

    async list(){
        return this.userRepository.find()
    }

    async show(id: number){
        const user = await this.userRepository.findOne({ where: { id } })
        return user ? user : {}
    }

    async update(id: number, data: UpdatePutUserDTO){
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt)

        await this.userRepository.update(id, data)

        return this.show(id)
    }

    async updatePartial(id: number, { email, nome, password, birthAt, role }: UpdatePatchUserDTO){
        const data: UpdatePatchUserDTO = {}

        if(email){
            data.email = email
        }

        if(nome){
            data.nome = nome
        }
        
        if(password){
            const salt = await bcrypt.genSalt();
            data.password = await bcrypt.hash(password, salt)
        }

        if(role){
            data.role = role
        }

        if(birthAt){
            data.birthAt = birthAt
        }

        await this.userRepository.update(id, data)
        return this.show(id)
    }

    async delete(id: number){
        return this.userRepository.delete(id)
    }

    // async exists(id: number){
    //     this.
    // }

}