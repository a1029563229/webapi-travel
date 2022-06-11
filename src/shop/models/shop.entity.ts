import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ShopBanner } from './shop_banner.entity';

export enum ShopType {
  EAT = 1,
  DRINK,
  PLAY,
  HAPPY,
  HOUSE,
}

// 数据表 —— shops
@Entity()
export class Shop {
  // 自增主键
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: 0 })
  type: ShopType;

  @Column({ default: '' })
  poster: string;

  // 一对多关系，单个店铺对应多张店铺图片
  @OneToMany(() => ShopBanner, (banner) => banner.shop)
  banners: ShopBanner[];

  @Column({ default: '' })
  tags: string;

  @Column({ default: 0 })
  score: number;

  @Column({ default: '' })
  evaluation: string;

  @Column({ default: '' })
  address: string;

  @Column({ default: 0 })
  longitude: number;

  @Column({ default: 0 })
  latitude: number;

  @Column({ default: 0 })
  average_cost: number;

  @Column({ default: '' })
  geo_code: string;

  @Column({ default: '' })
  city: string;

  @Column({ default: 0 })
  is_deleted: number;
}
