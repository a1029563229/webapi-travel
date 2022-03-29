import { Injectable } from '@nestjs/common';
import { upload } from 'src/utils/oss';

@Injectable()
export class CommonService {
  async uploadFile(file: Express.Multer.File) {
    return upload(file);
  }
}
