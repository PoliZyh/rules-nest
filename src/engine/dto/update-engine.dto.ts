import { PartialType } from '@nestjs/mapped-types';
import { CreateEngineDto } from './create-engine.dto';

export class UpdateEngineDto extends PartialType(CreateEngineDto) {}
