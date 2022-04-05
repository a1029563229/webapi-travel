import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryPlace } from 'src/common/common/dto/map.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get('search')
  @UseGuards(AuthGuard)
  @Roles('admin')
  async getPlace(@Query() queryPlace: QueryPlace) {
    const reply: any = await this.mapService.getPlace(queryPlace);
    return reply;
  }
}
