import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProjectDto {

    @IsNotEmpty()
    @IsString()
    projectName: string

    projectProfile: string

    @IsNotEmpty()
    @IsNumber()
    position: number

}
