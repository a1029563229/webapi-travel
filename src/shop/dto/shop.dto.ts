import { IsNotEmpty } from 'class-validator';
import { Pagination } from 'src/dto/pagination';
import { ShopType } from '../models/shop.entity';

export class QueryShopDto {
  @IsNotEmpty({ message: 'id 不能为空' })
  id: number;

  longitude: number;

  latitude: number;
}

export class CreateShopDto {
  @IsNotEmpty({ message: '店铺名称不能为空' })
  name: string;

  description: string;

  @IsNotEmpty({ message: '店铺类型不能为空' })
  type: ShopType;

  poster: string;

  banners: string[];

  tags: string[];

  @IsNotEmpty({ message: '店铺评分不能为空' })
  score: number;

  evaluation: string;

  @IsNotEmpty({ message: '店铺地址不能为空' })
  address: string;

  @IsNotEmpty({ message: '店铺经度不能为空' })
  longitude: number;

  @IsNotEmpty({ message: '店铺纬度不能为空' })
  latitude: number;

  average_cost: number;

  city: string;
}

export class UpdateShopDto extends CreateShopDto {
  id: string;
}

export class QueryShopListDto extends Pagination {
  longitude: number;

  latitude: number;

  city: string;
}
