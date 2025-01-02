import { Test, TestingModule } from '@nestjs/testing';
import { ApplyNoticeService } from './apply-notice.service';

describe('ApplyNoticeService', () => {
  let service: ApplyNoticeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplyNoticeService],
    }).compile();

    service = module.get<ApplyNoticeService>(ApplyNoticeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
