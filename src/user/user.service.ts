import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageService } from 'src/message/message.service';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private readonly messageService: MessageService
  ) {}

  async create(registerUserDto: RegisterUserDto) {
    // const data = new User()
    // data.username = registerUserDto.username
    // data.password = registerUserDto.password
    // const info = await this.user.save(data)
    // return info
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
