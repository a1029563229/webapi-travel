import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'shop_tags',
})
export class ShopTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shop_id: number;

  @Column()
  name: string;
}
