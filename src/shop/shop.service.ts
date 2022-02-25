import { Injectable } from '@nestjs/common';
import { Pagination } from 'src/dto/pagination';
import { Connection, getManager } from 'typeorm';
import { CreateShopDto } from './dto/create-shop.dto';
import { Shop } from './models/shop.entity';
import { ShopBanner } from './models/shop_banner.entity';

@Injectable()
export class ShopService {
  constructor(private readonly connection: Connection) {}

  async getShopList(pagination: Pagination) {
    const shopRepository = this.connection.getRepository(Shop);
    const { pageIndex = 1, pageSize = 10 } = pagination;
    return shopRepository
      .createQueryBuilder('shop')
      .leftJoinAndSelect('shop.banners', 'shop_banner')
      .take(pageIndex)
      .skip((pageIndex - 1) * pageSize)
      .getMany();
  }

  async addShop(createShopDto: CreateShopDto) {
    // 存储店铺信息
    const shop = new Shop();
    shop.name = createShopDto.name;
    shop.description = createShopDto.description;
    shop.poster = createShopDto.poster;
    shop.score = createShopDto.score;
    shop.type = createShopDto.type;
    shop.tags = createShopDto.tags.join(',');
    shop.evaluation = createShopDto.evaluation;
    shop.address = createShopDto.address;
    shop.longitude = createShopDto.longitude;
    shop.latitude = createShopDto.latitude;

    // 处理 banner
    if (createShopDto.banners?.length) {
      shop.banners = createShopDto.banners.map((item) => {
        const banner = new ShopBanner();
        banner.url = item;
        return banner;
      });
      await this.connection.manager.save(shop.banners);
    }

    return this.connection.manager.save(shop);
  }
}
