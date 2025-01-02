import { Test, TestingModule } from '@nestjs/testing';
import { VariableController } from './variable.controller';
import { VariableService } from './variable.service';

describe('VariableController', () => {
  let controller: VariableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VariableController],
      providers: [VariableService],
    }).compile();

    controller = module.get<VariableController>(VariableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
