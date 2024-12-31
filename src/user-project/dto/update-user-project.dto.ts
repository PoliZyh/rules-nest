import { PartialType } from '@nestjs/mapped-types';
import { CreateUserProjectDto } from './create-user-project.dto';

export class UpdateUserProjectDto extends PartialType(CreateUserProjectDto) {}
