import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  open_id: string;

  @Column({ default: '' })
  nickname: string;

  @Column({ default: 0 })
  gender: number;

  @Column({ default: 0 })
  mobile: number;

  @Column({ default: '' })
  avatar: string;

  @Column({ default: '' })
  country: string;

  @Column({ default: '' })
  province: string;

  @Column({ default: '' })
  city: string;

  @Column({ default: 0 })
  role: number;
}
