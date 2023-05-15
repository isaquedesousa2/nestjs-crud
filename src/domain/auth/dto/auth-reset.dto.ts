import { IsJWT, IsStrongPassword } from "class-validator";

export class AuthForgetDTO {

    @IsStrongPassword()
    passowrd: string;

    @IsStrongPassword()
    confirmPassowrd: string;

    @IsJWT()
    token: string;
}