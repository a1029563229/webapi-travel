import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import {
  CreateShopDto,
  QueryShopDto,
  UpdateShopDto,
  QueryShopListDto,
} from './dto/shop.dto';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  // 获取店铺列表接口
  @Get('list')
  async getShopList(@Query() queryShopListDto: QueryShopListDto) {
    const list = await this.shopService.getShopList(queryShopListDto);
    return {
      pageIndex: queryShopListDto.pageIndex,
      pageSize: queryShopListDto.pageSize,
      list,
    };
  }

  // 查询单个店铺
  @Get('detail')
  async getShopDetail(@Query() queryShopDto: QueryShopDto) {
    const detail = await this.shopService.getShopDetail(queryShopDto);
    return detail;
  }

  // add 接口
  @Post('add')
  @HttpCode(200)
  // 接收入参，类型为 CreateShopDto
  async addShop(@Body() createShopDto: CreateShopDto) {
    // 调用 service 的 addShop 方法，新增店铺
    await this.shopService.addShop(createShopDto);
    // 返回成功提示
    return null;
  }

  // update 接口
  @Post('update')
  @HttpCode(200)
  // 接收入参，类型为 UpdateShopDto
  async updateShop(@Body() updateShopDto: UpdateShopDto) {
    // 调用 service 的 addShop 方法，新增店铺
    await this.shopService.updateShop(updateShopDto);
    // 返回成功提示
    return null;
  }

  // delete 接口
  @Post('delete')
  @HttpCode(200)
  async deleteShop(@Body() deleteShopDto: QueryShopDto) {
    await this.shopService.deleteShop(deleteShopDto);
    return null;
  }
}
