import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'shop_banners',
})
export class ShopBanner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shop_id: number;

  @Column()
  url: string;
}
