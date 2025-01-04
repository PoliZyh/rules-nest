import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageService } from 'src/message/message.service';
import { removeKeys } from 'src/utils/removeKeys';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private readonly messageService: MessageService
  ) {}

  async validateUser(loginUserDto: LoginUserDto) {
    const user = await this.user.findOne({ where: { username: loginUserDto.username } })
    console.log(user)
    if (!user) return null // 用户不存在
    if (loginUserDto.password !== user.password) return null // 用户不匹配
    return user
  }

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

  async findOne(id: number) {
    const user = await this.user.findOne({ where: { id } })
    const userObj = removeKeys(user, ['password'])
    return userObj
  }

  async findUserById(userId: number) {
    const userInfo = await this.user.findOne({
      where: {
        id: userId
      }
    })
    return userInfo
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
