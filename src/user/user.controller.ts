import { Controller, Post, Body, Get, Param, Put, Patch, Delete } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { ParamId } from "src/decorators/param-id.decorator";

@Controller('users')
export class UserController {

    @Post()
    async create(@Body() { email, name, password }: CreateUserDTO) {
        return {
            user: {  name, email, password}
        }
    }

    @Get()
    async read() {
        return {users: []}
    }

    @Get(':id')
    async readOne(@Param() params) {
        return {user: {}}
    }

    @Put(':id')
    async update(@Body() { email, name, password }: UpdatePutUserDTO, @Param() params) {
        return {
            user: { name, email, password},
            params
        }
    }

    @Patch(':id')
    async updatePartial(@Body() { name, email, password}: UpdatePatchUserDTO, @ParamId() id: number) {
        return {
            user: { name, email, password},
            id
        }
    }

    @Delete(':id')
    async delete(@ParamId() id: number) {
        return {id}
    }
}