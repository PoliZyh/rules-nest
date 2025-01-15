import { PartialType } from '@nestjs/mapped-types';
import { CreateOpenApiDto } from './create-open-api.dto';

export class UpdateOpenApiDto extends PartialType(CreateOpenApiDto) {}
