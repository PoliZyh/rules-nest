import { Module } from '@nestjs/common';
import { GeneralService } from './general.service';
import { GeneralController } from './general.controller';
import { MessageService } from 'src/message/message.service';

@Module({
  controllers: [GeneralController],
  providers: [GeneralService, MessageService],
})
export class GeneralModule {}
