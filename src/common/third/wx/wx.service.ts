import { Injectable } from '@nestjs/common';
import { WxLoginDto } from './wx.dto';
import service from './service';

@Injectable()
export class WxService {
  async queryOpenId(wxLoginDto: WxLoginDto): Promise<string> {
    const reply = (await service.get('/sns/jscode2session', {
      params: {
        appid: process.env.WX_APPID,
        secret: process.env.WX_SECRET,
        js_code: wxLoginDto.code,
        grant_type: 'authorization_code',
      },
    })) as any;
    return reply.openid;
  }
}
