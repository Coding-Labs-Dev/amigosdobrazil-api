import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { uuid } from 'uuidv4';
import { extname, resolve } from 'path';
import { Request } from 'express';

import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  const path = resolve(__dirname, '..', '..', '.env.');

  dotenv.config({
    path: resolve(`${path}${process.env.NODE_ENV || 'development'}`),
  });
  dotenv.config({
    path: resolve(`${path}local`),
  });
} else {
  dotenv.config();
}
const S3 = new AWS.S3({ region: 'us-east-1' });

const multerConfig = {
  storage:
    process.env.STORAGE === 's3'
      ? multerS3({
          s3: S3,
          bucket: process.env.S3_BUCKET,
          key: (_req: Request, file, cb) => {
            const filename = `${uuid()}${extname(file.originalname)}`;
            return cb(null, `${filename}`);
          },
        })
      : multer.diskStorage({
          destination: resolve(__dirname, '..', '..', 'tmp'),
          filename: (_req, file, callback) => {
            const filename = `${uuid()}${extname(
              file.originalname,
            ).toLowerCase()}`;
            return callback(null, filename);
          },
        }),
};

export default multerConfig;
