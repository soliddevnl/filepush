import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectsCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import { S3Factory } from './s3-factory';
import { AppConfigService } from '../app-config/app-config.service';

@Injectable()
export class S3Service {
  private readonly bucket: string;
  private client: S3Client;

  constructor(
    private config: AppConfigService,
    private clientFactory: S3Factory,
  ) {
    this.bucket = config.s3.bucket;
    this.client = this.clientFactory.create({
      region: this.config.s3.region,
      credentials: {
        accessKeyId: this.config.s3.key,
        secretAccessKey: this.config.s3.secret,
      },
    });
  }

  async putObject(path: string, data: Buffer): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: path,
      Body: data,
    });

    await this.client.send(command);
  }

  getObjectUrl(path: string): string {
    return `https://${this.bucket}.s3.amazonaws.com/${path}`;
  }

  async deleteObjects(paths: Array<string>): Promise<void> {
    const command = new DeleteObjectsCommand({
      Bucket: this.bucket,
      Delete: {
        Objects: paths.map((path) => {
          return {
            Key: path,
          };
        }),
        Quiet: false,
      },
    });

    await this.client.send(command);
  }

  async objectExists(path: string): Promise<boolean> {
    const command = new HeadObjectCommand({
      Bucket: this.bucket,
      Key: path,
    });

    try {
      await this.client.send(command);
    } catch (e) {
      return false;
    }

    return true;
  }
}
