import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  async getUserInfo(@Query() userDto: UserDto) {
    const reply = await this.userService.queryUser(userDto);
    return reply;
  }

  @Post('add')
  @HttpCode(200)
  async addUser(@Body() userDto: UserDto) {
    await this.userService.createUser(userDto);
    return null;
  }
}
