import { Module } from '@nestjs/common';
import { VariableService } from './variable.service';
import { VariableController } from './variable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variable } from './entities/variable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Variable])],
  controllers: [VariableController],
  providers: [VariableService],
})
export class VariableModule {}
