import { Test, TestingModule } from '@nestjs/testing';
import { ApplyNoticeController } from './apply-notice.controller';
import { ApplyNoticeService } from './apply-notice.service';

describe('ApplyNoticeController', () => {
  let controller: ApplyNoticeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplyNoticeController],
      providers: [ApplyNoticeService],
    }).compile();

    controller = module.get<ApplyNoticeController>(ApplyNoticeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
