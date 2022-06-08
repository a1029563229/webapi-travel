import {
  Controller,
  Get,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import '../../utils/oss';
import { CommonService } from './common.service';

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(200)
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.commonService.uploadFile(file);
  }

  @Get('city/list')
  getCityList() {
    return this.commonService.getCityList();
  }
}
