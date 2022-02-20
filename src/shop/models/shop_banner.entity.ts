import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Shop } from './shop.entity';

@Entity()
export class ShopBanner {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Shop)
  shop_id: number;

  @Column()
  url: string;
}
