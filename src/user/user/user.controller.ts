import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { QueryUserDto, UserDto, UserUpdateDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  async getUserInfo(@Query() queryUserDto: QueryUserDto) {
    const reply = await this.userService.queryUserByToken(queryUserDto.token);
    return reply;
  }

  @Post('add')
  @HttpCode(200)
  async addUser(@Body() userDto: UserDto) {
    await this.userService.createUser(userDto);
    return null;
  }

  @Post('update')
  @HttpCode(200)
  async updateUser(@Body() userUpdateDto: UserUpdateDto) {
    await this.userService.updateUser(userUpdateDto);
    return null;
  }
}
