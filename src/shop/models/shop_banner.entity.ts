import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Shop } from './shop.entity';

@Entity()
export class ShopBanner {
  @PrimaryGeneratedColumn()
  id: number;

  // 多对一关系，多张店铺图片对应一家店铺
  // 在使用 left join 时，使用 shop_id 字段查询驱动表
  @ManyToOne(() => Shop, (shop) => shop.banners)
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;

  @Column()
  url: string;

  @Column()
  sort: number;

  @Column()
  is_deleted: number;
}
