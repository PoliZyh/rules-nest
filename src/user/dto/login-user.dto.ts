
import { IsNotEmpty, IsString } from "class-validator"


export class LoginUserDto {


    @IsNotEmpty() // 是否为空
    @IsString()  // 是否为字符串
    username: string


    @IsNotEmpty()
    @IsString()
    password: string
}