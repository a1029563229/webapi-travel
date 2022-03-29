import { Controller, HttpCode, Post } from '@nestjs/common';
import { WxLoginDto } from './wx.dto';
import { WxService } from './wx.service';

@Controller('wx')
export class WxController {
  constructor(private readonly wxService: WxService) {}

  @Post('login')
  @HttpCode(200)
  async login(wxLogin: WxLoginDto) {
    const reply = await this.wxService.login(wxLogin);
    return reply;
  }
}
