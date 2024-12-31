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
  async userLogin(@Req() req, @Body(UserPipe) loginUserDto: LoginUserDto) {
    const res = await this.userService.validateUser(loginUserDto)
    if (!res) return false
    req.session.userId = res.id
    return true
  }

  // 1.2 注册接口
  @Post('/register')
  userRegister(@Req() req, @Body() registerUserDto: RegisterUserDto) {
    const verCode = req.session.code
    // 验证验证码是否正确
    // todo重名
    if(verCode !== registerUserDto.code) { return false } // false即为验证不通过

    this.userService.create(registerUserDto)
    return true
  }

  //1.6 获取用户信息接口
  @Post('/getUserInfo')
  async getUserInfo(@Req() req) {
    const res = await this.userService.findOne(req.session.userId)
    return res
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
