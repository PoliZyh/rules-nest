import { Module } from '@nestjs/common';
import { VariableService } from './variable.service';
import { VariableController } from './variable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variable } from './entities/variable.entity';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Variable]),
    FileModule
  ],
  controllers: [VariableController],
  providers: [VariableService],
})
export class VariableModule {}
