import { Body, Controller, Post } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  // add 接口
  @Post('add')
  // 接收入参，类型为 CreateShopDto
  async addShop(@Body() createShopDto: CreateShopDto) {
    // 调用 service 的 addShop 方法，新增店铺
    await this.shopService.addShop(createShopDto);
    // 返回成功提示
    return {
      code: 1,
      message: 'ok',
      data: null,
    };
  }
}
