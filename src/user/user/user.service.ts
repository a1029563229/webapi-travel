import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
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

  queryUser(userDto: UserDto) {
    const openId = userDto.open_id;
    return this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.open_id = :openId', { openId })
      .getOne();
  }
}
