import { ShopType } from '../models/shop.entity';

export class CreateShopDto {
  name: string;

  description: string;

  type: ShopType;

  poster: string;

  banners: string[];

  tags: string[];

  score: number;

  evaluation: string;
}
