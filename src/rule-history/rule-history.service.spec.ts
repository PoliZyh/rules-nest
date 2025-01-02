import { Test, TestingModule } from '@nestjs/testing';
import { RuleHistoryService } from './rule-history.service';

describe('RuleHistoryService', () => {
  let service: RuleHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RuleHistoryService],
    }).compile();

    service = module.get<RuleHistoryService>(RuleHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
