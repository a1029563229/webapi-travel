import { Injectable } from '@nestjs/common';
import { QueryPlace } from 'src/common/dto/map.dto';
import service from './service';

@Injectable()
export class MapService {
  async getPlace(queryPlace: QueryPlace) {
    const reply: any = await service.get('/place/text', {
      params: {
        key: process.env.MAP_KEY,
        keywords: queryPlace.keywords,
        city: queryPlace.city,
        citylimit: true,
        extensions: 'base',
      },
    });
    const pois = reply.pois;
    return pois.map((item) => ({
      ...item,
      longitude: +item.location.split(',')[0],
      latitude: +item.location.split(',')[1],
      address: `${item.cityname}${item.adname}${item.address}`,
    }));
  }
}
