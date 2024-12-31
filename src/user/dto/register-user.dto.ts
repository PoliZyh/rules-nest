

import { IsNotEmpty, IsString } from "class-validator";
import { LoginUserDto } from "./login-user.dto";
// import { PartialType } from "@nestjs/mapped-types";

// PartialType 生成可选类

export class RegisterUserDto extends LoginUserDto {

    @IsNotEmpty()
    @IsString()
    code: string;

}