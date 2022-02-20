import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { Shop } from './models/shop.entity';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get('list')
  async findAll() {
    return 'Test Shops List';
  }

  @Post('add')
  async addShop(@Body() createShopDto: CreateShopDto) {
    await this.shopService.addShop(createShopDto);
    return {
      code: 1,
      message: 'ok',
      data: null,
    };
  }
}
