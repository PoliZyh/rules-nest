import { Test, TestingModule } from '@nestjs/testing';
import { UserProjectController } from './user-project.controller';
import { UserProjectService } from './user-project.service';

describe('UserProjectController', () => {
  let controller: UserProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserProjectController],
      providers: [UserProjectService],
    }).compile();

    controller = module.get<UserProjectController>(UserProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
