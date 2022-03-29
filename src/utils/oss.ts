import { hash } from '.';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const OSS = require('ali-oss');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Duplex = require('stream').Duplex;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const ossConfig = {
  region: process.env.OSS_REGION,
  accessKeyId: process.env.OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
  bucket: process.env.OSS_BUCKET,
};
const client = new OSS(ossConfig);

export const upload = async (file: Express.Multer.File): Promise<string> => {
  const stream = new Duplex();
  stream.push(file.buffer);
  stream.push(null);
  const fileName = hash(file.originalname) + path.extname(file.originalname);
  await client.putStream(fileName, stream);
  const url = `http://${ossConfig.bucket}.${ossConfig.region}.aliyuncs.com/${fileName}`;
  return url;
};
