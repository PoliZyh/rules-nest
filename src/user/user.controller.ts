import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserPipe } from './user.pipe';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //1.1 登陆接口
  @Post('/login')
  userLogin(@Body(UserPipe) loginUserDto: LoginUserDto) {
    // todo session & login
    return true
  }

  // 1.2 注册接口
  @Post('/register')
  userRegister(@Req() req, @Body() registerUserDto: RegisterUserDto) {
    const verCode = req.session.code
    // 验证验证码是否正确
    if(verCode !== registerUserDto.code) { return false } // false即为验证不通过

    this.userService.create(registerUserDto)
    return true
  }

  






  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

}
