import { Injectable, Logger } from '@nestjs/common';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import * as mime from 'mime-types';
import { v4 as uuidv4 } from 'uuid';

import * as dotenv from 'dotenv';
import { User } from 'src/db/schema/users';
dotenv.config();
@Injectable()
export class UploadService {
  bucket = process.env.OB_AWS_BUCKET;
  s3 = new S3Client({
    region: process.env.OB_AWS_REGION,
    credentials: {
      accessKeyId: process.env.OB_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.OB_AWS_SECRET_ACCESS_KEY,
    },
  });

  async uploadFile(data: { file: any; user: User }) {
    const { file, user } = data;
    Logger.verbose('Upload file :', file);
    const contentType = mime.lookup(file.originalname);
    const uuid = uuidv4();
    const metadata = {
      userId: String(user.id),
      username: user.username,
      email: user.email,
      role: user.role,
    };
    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: uuid,
        Body: file.buffer,
        ContentType: contentType || 'application/octet-stream',
        Metadata: metadata,
      }),
    );
    return uuid;
  }

  async replaceFile(data: { key: string; file: any; user: User }) {
    const { key, file, user } = data;
    Logger.verbose('Replace file :', key);
    const contentType = mime.lookup(file.originalname);
    const metadata = {
      userId: String(user.id),
      username: user.username,
      email: user.email,
      role: user.role,
    };
    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: contentType || 'application/octet-stream',
        Metadata: metadata,
      }),
    );

    return key;
  }
  async removeFile(key: string) {
    Logger.verbose('Remove file :', key);
    await this.s3.send(
      new DeleteObjectCommand({ Bucket: this.bucket, Key: key }),
    );
    return key;
  }
}
