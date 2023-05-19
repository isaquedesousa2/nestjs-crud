import { IsEmail, IsOptional, IsString, IsStrongPassword, IsDateString, IsEnum } from "class-validator";
import { Role } from "src/enums/role.enum";

export class AuthRegisterDTO {

    @IsString()
    nome: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({ minLength: 6 })
    password: string;

    @IsOptional()
    @IsDateString()
    birthAt: string;

    @IsOptional()
    @IsEnum(Role)
    role:number
}