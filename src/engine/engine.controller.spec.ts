import { Test, TestingModule } from '@nestjs/testing';
import { EngineController } from './engine.controller';
import { EngineService } from './engine.service';

describe('EngineController', () => {
  let controller: EngineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EngineController],
      providers: [EngineService],
    }).compile();

    controller = module.get<EngineController>(EngineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
