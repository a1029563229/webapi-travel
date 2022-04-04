import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common/common.module';
import { ShopModule } from './shop/shop.module';
import { MapModule } from './common/third/map/map.module';
import { WxModule } from './common/third/wx/wx.module';
import { UserModule } from './user/user/user.module';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ShopModule,
    CommonModule,
    MapModule,
    UserModule,
    WxModule,
  ],
  exports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
