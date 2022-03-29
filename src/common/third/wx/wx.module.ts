import { Module } from '@nestjs/common';
import { WxController } from './wx.controller';
import { WxService } from './wx.service';

@Module({
  controllers: [WxController],
  providers: [WxService],
})
export class WxModule {}
