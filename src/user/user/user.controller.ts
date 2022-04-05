import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserDto, UserUpdateDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  @UseGuards(AuthGuard)
  async getUserInfo(@Request() req: Request) {
    const reply = await this.userService.queryUserByToken(
      req['context']['token'],
    );
    return reply;
  }

  @Post('add')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Roles('admin')
  async addUser(@Body() userDto: UserDto) {
    await this.userService.createUser(userDto);
    return null;
  }

  @Post('update')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async updateUser(@Body() userUpdateDto: UserUpdateDto) {
    await this.userService.updateUser(userUpdateDto);
    return null;
  }
}
