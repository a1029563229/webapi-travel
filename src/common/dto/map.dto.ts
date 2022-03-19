import { IsNotEmpty } from 'class-validator';

export class QueryPlace {
  @IsNotEmpty({ message: '关键词不能为空' })
  keywords: string;

  longitude: number;

  latitude: number;

  city: string;
}
