import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from 'src/user/auth/auth.service';
import { UserService } from 'src/user/user/user.service';
import { WxLoginDto } from './wx.dto';
import { WxService } from './wx.service';

@Controller('wx')
export class WxController {
  constructor(
    private readonly wxService: WxService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() wxLogin: WxLoginDto) {
    const openId = await this.wxService.queryOpenId(wxLogin);
    let user = await this.userService.queryUserByOpenId(openId);
    if (!user) {
      user = await this.userService.createUser({ open_id: openId });
    }
    const token = await this.authService.createToken(openId, user.id);

    return token;
  }
}
