import { Module } from '@nestjs/common';
import { EngineService } from './engine.service';
import { EngineController } from './engine.controller';
import { Variable } from 'src/variable/entities/variable.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Variable])],
  controllers: [EngineController],
  providers: [EngineService],
  exports: [EngineService]
})
export class EngineModule {}
