// eslint-disable-next-line @typescript-eslint/no-var-requires
const geohash = require('ngeohash');

import { Injectable } from '@nestjs/common';
import { computeInstance, convertKMToKmStr } from 'src/utils';
import { Connection, getManager } from 'typeorm';
import {
  CreateShopDto,
  QueryShopDto,
  QueryShopListDto,
  UpdateShopDto,
} from './dto/shop.dto';
import { Shop } from './models/shop.entity';
import { ShopBanner } from './models/shop_banner.entity';

@Injectable()
export class ShopService {
  constructor(private readonly connection: Connection) {}

  async getShopList(queryShopListDto: QueryShopListDto) {
    const shopRepository = this.connection.getRepository(Shop);
    const { pageIndex = 1, pageSize = 10 } = queryShopListDto;
    const data = await shopRepository
      .createQueryBuilder('shop')
      .leftJoinAndSelect('shop.banners', 'shop_banner')
      .take(pageSize)
      .skip((pageIndex - 1) * pageSize)
      .getMany();

    return data
      .map((item) => {
        const distance = computeInstance(
          queryShopListDto.longitude,
          queryShopListDto.latitude,
          item.longitude,
          item.latitude,
        );
        return {
          ...item,
          tags: item.tags.split(','),
          distanceKm: distance,
          distance: convertKMToKmStr(distance),
        };
      })
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }

  async getShopDetail(queryShopDto: QueryShopDto) {
    const data = await this.connection
      .getRepository(Shop)
      .createQueryBuilder('shop')
      .leftJoinAndSelect('shop.banners', 'shop_banner')
      .where('shop.id = :id', { id: queryShopDto.id })
      .getOne();
    return { ...data, tags: data.tags.split(',') };
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
    shop.average_cost = createShopDto.average_cost;
    shop.geo_code = geohash.encode(
      createShopDto.longitude,
      createShopDto.latitude,
    );
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
