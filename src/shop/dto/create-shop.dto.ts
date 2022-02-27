import { ShopType } from '../models/shop.entity';

export class QueryShopDto {
  id: number;
}

export class CreateShopDto {
  name: string;

  description: string;

  type: ShopType;

  poster: string;

  banners: string[];

  tags: string[];

  score: number;

  evaluation: string;

  address: string;

  longitude: number;

  latitude: number;
}

export class UpdateShopDto extends CreateShopDto {
  id: string;
}
