import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Pagination } from 'src/dto/pagination';
import { CreateShopDto } from './dto/create-shop.dto';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  // 获取店铺列表接口
  @Get('list')
  async getShopList(@Query() pagination: Pagination) {
    const list = await this.shopService.getShopList(pagination);
    console.log(list);
    return {
      code: 1,
      message: 'ok',
      data: list,
    };
  }

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
