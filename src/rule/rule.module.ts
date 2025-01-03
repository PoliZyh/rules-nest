import { Module } from '@nestjs/common';
import { RuleService } from './rule.service';
import { RuleController } from './rule.controller';
import { Rule } from './entities/rule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { FileModule } from 'src/file/file.module';
import { UserProjectModule } from 'src/user-project/user-project.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rule, User]),
    FileModule,
    UserProjectModule
  ],
  controllers: [RuleController],
  providers: [RuleService],
})
export class RuleModule {}
