import { IsEmail, IsOptional, IsString, IsStrongPassword, IsDateString } from "class-validator";

export class AuthRegisterDTO {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;

    @IsStrongPassword()
    confirmPassword: string;

    @IsOptional()
    @IsDateString()
    dateAt: string
}