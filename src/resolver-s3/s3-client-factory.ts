import { Injectable } from '@nestjs/common';
import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';

@Injectable()
export class S3ClientFactory {
  create(config: S3ClientConfig): S3Client {
    return new S3Client(config);
  }
}
