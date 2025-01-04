import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project } from './entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProject } from 'src/user-project/entities/user-project.entity';
import { UserProjectModule } from 'src/user-project/user-project.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Project, UserProject]),
    UserProjectModule
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService]
})
export class ProjectModule {}
