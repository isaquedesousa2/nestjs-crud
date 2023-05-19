import { IsEmail, IsOptional, IsString, IsStrongPassword, IsDateString } from "class-validator";

export class AuthRegisterDTO {

    @IsString()
    nome: string;

    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;

    @IsOptional()
    @IsDateString()
    dateAt: string
}