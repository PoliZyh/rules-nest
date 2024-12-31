import { Module } from '@nestjs/common';
import { UserProjectService } from './user-project.service';
import { UserProjectController } from './user-project.controller';
import { UserProject } from './entities/user-project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserProject])],
  controllers: [UserProjectController],
  providers: [UserProjectService],
})
export class UserProjectModule {}
