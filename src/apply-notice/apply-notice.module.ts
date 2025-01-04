import { Module } from '@nestjs/common';
import { ApplyNoticeService } from './apply-notice.service';
import { ApplyNoticeController } from './apply-notice.controller';
import { ApplyNotice } from './entities/apply-notice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplyNotice]),
    UserModule
  ],
  controllers: [ApplyNoticeController],
  providers: [ApplyNoticeService],
})
export class ApplyNoticeModule {}
