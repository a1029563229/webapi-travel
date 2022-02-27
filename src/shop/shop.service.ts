import { Injectable } from '@nestjs/common';
import { Pagination } from 'src/dto/pagination';
import { Connection, getManager } from 'typeorm';
import {
  CreateShopDto,
  QueryShopDto,
  UpdateShopDto,
} from './dto/create-shop.dto';
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

  async getShopDetail(queryShopDto: QueryShopDto) {
    return this.connection
      .getRepository(Shop)
      .createQueryBuilder('shop')
      .leftJoinAndSelect('shop.banners', 'shop_banner')
      .where('shop.id = :id', { id: queryShopDto.id })
      .getOne();
  }

  async addShop(createShopDto: CreateShopDto) {
    // 存储店铺信息
    const shop = this.getShop(new Shop(), createShopDto);

    // 处理 banner
    if (createShopDto.banners?.length) {
      shop.banners = this.getBanners(createShopDto);
      await this.connection.manager.save(shop.banners);
    }

    return this.connection.manager.save(shop);
  }

  async updateShop(updateShopDto: UpdateShopDto) {
    return getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager
        .createQueryBuilder()
        .delete()
        .from(ShopBanner)
        .where('shop_id = :shop_id', { shop_id: updateShopDto.id })
        .execute();

      const originalShop: Shop = await transactionalEntityManager.findOne(
        Shop,
        updateShopDto.id,
      );
      const shop = this.getShop(originalShop, updateShopDto);

      if (updateShopDto.banners?.length) {
        shop.banners = this.getBanners(updateShopDto);
        await transactionalEntityManager.save(shop.banners);
      }

      await transactionalEntityManager.save(shop);
    });
  }

  getShop(shop: Shop, createShopDto: CreateShopDto) {
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
    return shop;
  }

  getBanners(createShopDto: CreateShopDto) {
    return createShopDto.banners.map((item) => {
      const banner = new ShopBanner();
      banner.url = item;
      return banner;
    });
  }

  async deleteShop(deleteShopDto: QueryShopDto) {
    return getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager
        .createQueryBuilder()
        .delete()
        .from(Shop)
        .where('id = :id', { id: deleteShopDto.id })
        .execute();

      await transactionalEntityManager
        .createQueryBuilder()
        .delete()
        .from(ShopBanner)
        .where('shop_id = :shop_id', { shop_id: deleteShopDto.id })
        .execute();
    });
  }
}
