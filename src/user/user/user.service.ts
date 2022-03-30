import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Auth } from '../auth/models/auth.entity';
import { UserDto, UserUpdateDto } from './dto/user.dto';
import { User } from './models/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly connection: Connection) {}

  createUser(userDto: UserDto) {
    const user = this.getUser(new User(), userDto);
    return this.connection.manager.save(user);
  }

  async updateUser(userUpdateDto: UserUpdateDto) {
    const u = await this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .where('id = :id', { id: userUpdateDto.id })
      .getOne();

    console.log(u);

    const user = this.getUser(u, userUpdateDto);
    return this.connection.manager.save(user);
  }

  getUser(user: User, userDto: UserDto) {
    user.open_id = userDto.open_id;
    user.nickname = userDto.nickname;
    user.mobile = userDto.mobile;
    user.avatar = userDto.avatar;
    user.gender = userDto.gender;
    user.country = userDto.country;
    user.province = userDto.province;
    user.city = userDto.city;
    return user;
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
