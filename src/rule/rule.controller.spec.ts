import { Test, TestingModule } from '@nestjs/testing';
import { RuleController } from './rule.controller';
import { RuleService } from './rule.service';

describe('RuleController', () => {
  let controller: RuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RuleController],
      providers: [RuleService],
    }).compile();

    controller = module.get<RuleController>(RuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
