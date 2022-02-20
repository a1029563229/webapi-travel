import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Shop } from './shop.entity';

@Entity()
export class ShopTag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Shop)
  shop_id: number;

  @Column()
  name: string;
}
