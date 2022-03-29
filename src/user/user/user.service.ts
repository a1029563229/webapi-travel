import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Auth } from '../auth/models/auth.entity';
import { UserDto } from './dto/user.dto';
import { User } from './models/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly connection: Connection) {}

  createUser(userDto: UserDto) {
    const user = new User();
    user.open_id = userDto.open_id;
    user.nickname = userDto.nickname;
    user.mobile = userDto.mobile;
    user.avatar = userDto.avatar;
    user.gender = userDto.gender;
    user.country = userDto.country;
    user.province = userDto.province;
    user.city = userDto.city;
    return this.connection.manager.save(user);
  }

  queryUserByOpenId(openId: string) {
    return this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.open_id = :openId', { openId })
      .getOne();
  }

  async queryUserByToken(token: string) {
    const auth = await this.connection
      .getRepository(Auth)
      .createQueryBuilder('auth')
      .select(['auth.user_id'])
      .where('auth.token = :token', { token })
      .getOne();

    return this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId: auth.user_id })
      .getOne();
  }
}
