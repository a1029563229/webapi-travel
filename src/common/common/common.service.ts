import { Injectable } from '@nestjs/common';
import { upload } from 'src/utils/oss';

const cityList = ['深圳', '成都'];

@Injectable()
export class CommonService {
  async uploadFile(file: Express.Multer.File) {
    return upload(file);
  }

  getCityList() {
    return cityList.map((item) => ({ key: item, value: item }));
  }
}
