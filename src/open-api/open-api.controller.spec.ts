import { Test, TestingModule } from '@nestjs/testing';
import { OpenApiController } from './open-api.controller';
import { OpenApiService } from './open-api.service';

describe('OpenApiController', () => {
  let controller: OpenApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenApiController],
      providers: [OpenApiService],
    }).compile();

    controller = module.get<OpenApiController>(OpenApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
