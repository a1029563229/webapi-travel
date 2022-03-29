import { Injectable } from '@nestjs/common';
import { hash } from 'src/utils';
import { Connection } from 'typeorm';
import { Auth } from './models/auth.entity';

@Injectable()
export class AuthService {
  constructor(private readonly connection: Connection) {}

  async queryToken(openId: string): Promise<string> {
    const auth = await this.connection
      .getRepository(Auth)
      .createQueryBuilder('auth')
      .select(['token'])
      .where('auth.open_id = :openId', { openId })
      .getOne();
    return auth.token;
  }

  async createToken(openId: string, userId: number): Promise<string> {
    const token = hash(openId);
    const auth = new Auth();
    auth.token = token;
    auth.open_id = openId;
    auth.user_id = userId;
    await Promise.all([
      this.connection.manager.save(auth),
      this.connection
        .createQueryBuilder()
        .delete()
        .from(Auth)
        .where('open_id = :openId', { openId })
        .execute(),
    ]);
    return token;
  }
}
