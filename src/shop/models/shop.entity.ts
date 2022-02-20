import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ShopType {
  EAT = 1,
  DRINK,
  PLAY,
  HAPPY,
}

@Entity({
  name: 'shops',
})
export class Shop {
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
}
