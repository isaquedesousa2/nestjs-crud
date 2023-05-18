import { Controller, Post, Body, Get, Param, Put, Patch, Delete, ParseIntPipe } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { ParamId } from "src/decorators/param-id.decorator";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Post()
    async create(@Body() data: CreateUserDTO) {
        return this.userService.create(data)
    }

    @Get()
    async read() {
        return this.userService.list()
    }

    @Get(':id')
    async readOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.show(id)
    }

    @Put(':id')
    async update(@Body() { email, nome, password }: UpdatePutUserDTO, @Param('id', ParseIntPipe) id: number){
        return this.userService.update(id, { email, nome, password })
    }

    @Patch(':id')
    async updatePartial(@Body() { nome, email, password}: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number) {
        return this.userService.updatePartial(id, { email, nome, password })
    }

    @Delete(':id')
    async delete(@ParamId() id: number) {
        return this.userService.delete(id)
    }
}