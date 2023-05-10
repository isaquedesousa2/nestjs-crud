import { IsString, IsEmail, IsStrongPassword } from "class-validator";

export class CreateUserDTO {

    @IsString()
    name: String;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6
    })
    password: string;
}