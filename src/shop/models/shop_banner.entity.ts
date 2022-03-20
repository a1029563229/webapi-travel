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

  @ManyToOne(() => Shop, (shop) => shop.banners)
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;

  @Column()
  url: string;

  @Column()
  sort: number;
}
