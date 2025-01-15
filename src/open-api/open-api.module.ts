import { Module } from '@nestjs/common';
import { OpenApiService } from './open-api.service';
import { OpenApiController } from './open-api.controller';
import { EngineModule } from 'src/engine/engine.module';
import { RuleModule } from 'src/rule/rule.module';

@Module({
  imports: [EngineModule, RuleModule],
  controllers: [OpenApiController],
  providers: [OpenApiService],
})
export class OpenApiModule {}
