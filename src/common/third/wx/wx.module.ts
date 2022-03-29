import { Module } from '@nestjs/common';
import { AuthService } from 'src/user/auth/auth.service';
import { UserService } from 'src/user/user/user.service';
import { WxController } from './wx.controller';
import { WxService } from './wx.service';

@Module({
  controllers: [WxController],
  providers: [WxService, AuthService, UserService],
})
export class WxModule {}
