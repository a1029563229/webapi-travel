import { Controller, Get, Query } from '@nestjs/common';
import { QueryPlace } from 'src/common/dto/map.dto';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get('search')
  async getPlace(@Query() queryPlace: QueryPlace) {
    const reply: any = await this.mapService.getPlace(queryPlace);
    return reply;
  }
}
