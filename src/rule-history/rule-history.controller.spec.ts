import { Test, TestingModule } from '@nestjs/testing';
import { RuleHistoryController } from './rule-history.controller';
import { RuleHistoryService } from './rule-history.service';

describe('RuleHistoryController', () => {
  let controller: RuleHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RuleHistoryController],
      providers: [RuleHistoryService],
    }).compile();

    controller = module.get<RuleHistoryController>(RuleHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
