import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ShopModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
