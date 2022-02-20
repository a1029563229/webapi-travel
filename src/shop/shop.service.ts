import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CreateShopDto } from './dto/create-shop.dto';
import { Shop } from './models/shop.entity';
import { ShopBanner } from './models/shop_banner.entity';
import { ShopTag } from './models/shop_tag.entity';

@Injectable()
export class ShopService {
  constructor(private readonly connection: Connection) {}

  async addShop(createShopDto: CreateShopDto) {
    const shop = new Shop();
    shop.name = createShopDto.name;
    shop.description = createShopDto.description;
    shop.poster = createShopDto.poster;
    shop.score = createShopDto.score;
    shop.type = createShopDto.type;
    shop.evaluation = createShopDto.evaluation;
    await this.connection.manager.save(shop);

    const tasks: Promise<any>[] = [Promise.resolve()];
    // 处理 banner
    if (createShopDto.banners?.length) {
      const banners = createShopDto.banners.map((item) => {
        const banner = new ShopBanner();
        banner.shop_id = shop.id;
        banner.url = item;
        return banner;
      });
      tasks.push(this.connection.manager.save(banners));
    }

    // 处理标签
    if (createShopDto.tags?.length) {
      const tags = createShopDto.tags.map((item) => {
        const tag = new ShopTag();
        tag.shop_id = shop.id;
        tag.name = item;
        return tag;
      });
      tasks.push(this.connection.manager.save(tags));
    }

    return Promise.all(tasks);
  }
}
