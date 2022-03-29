import { Injectable } from '@nestjs/common';
import { QueryPlace } from 'src/common/common/dto/map.dto';
import { computeInstance, convertKMToKmStr } from 'src/utils';
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
    const pois = reply.pois || [];
    return pois
      .map((item) => {
        const loc = item.location.split(',');
        const longitude = +loc[0];
        const latitude = +loc[1];
        const distance = computeInstance(
          queryPlace.longitude,
          queryPlace.latitude,
          longitude,
          latitude,
        );

        return {
          ...item,
          longitude,
          latitude,
          address: `${item.cityname}${item.adname}${item.address}`,
          distanceKm: distance,
          distance: convertKMToKmStr(distance),
        };
      })
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }
}
