import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common/common.module';
import { ShopModule } from './shop/shop.module';
import { MapModule } from './common/third/map/map.module';
import { WxModule } from './common/third/wx/wx.module';
import { UserModule } from './user/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ShopModule,
    CommonModule,
    MapModule,
    UserModule,
    WxModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
