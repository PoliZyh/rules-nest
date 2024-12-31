import { Injectable } from '@nestjs/common';
import { CreateGeneralDto } from './dto/create-general.dto';
import { UpdateGeneralDto } from './dto/update-general.dto';
import { MessageService } from 'src/message/message.service';

@Injectable()
export class GeneralService {

  constructor(private readonly messageService: MessageService) {}

  getCode(phone) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    this.messageService.sendMessage(code, phone)
    return code
  }
}
