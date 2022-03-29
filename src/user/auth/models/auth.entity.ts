import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  token: string;

  @Column({ default: 0 })
  user_id: number;

  @Column({ default: '' })
  open_id: string;
}
