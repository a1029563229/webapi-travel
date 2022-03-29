import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: 'open_id 不能为空' })
  open_id: string;

  nickname: string;

  gender: number;

  mobile: number;

  avatar: string;

  country: string;

  province: string;

  city: string;

  role: number;
}
