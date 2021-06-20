import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { S3Factory } from './s3-factory';

@Injectable()
export class S3Service {
  private client: S3Client;
  private clientFactory: S3Factory = new S3Factory();

  getClient(): S3Client {
    this.client = this.clientFactory.create({
      region: 'eu-central-1',
      credentials: {
        accessKeyId: 'AKIAWICX23AH6GXUPM7C',
        secretAccessKey: '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',
      },
    });

    return this.client;
  }

  async putObject(bucket: string, path: string, data: Buffer): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: path,
      Body: data,
    });

    await this.getClient().send(command);
  }
}
