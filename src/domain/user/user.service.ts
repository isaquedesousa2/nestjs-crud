import { Injectable } from "@nestjs/common";
import { UserEntity } from "./entity/user.entity";
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDTO } from "./dto/create-user.dto";


@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>){}

    async create(data: CreateUserDTO){
    
        return this.userRepository.create(data)
    }
}