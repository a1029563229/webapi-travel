import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ShopType {
  EAT = 1,
  DRINK,
  PLAY,
  HAPPY,
}

// 数据表 —— shops
@Entity({
  name: 'shops',
})
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
}
