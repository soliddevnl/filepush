import { Injectable } from '@nestjs/common';
import {
  DeleteObjectsCommand,
  PutObjectCommand,
  HeadObjectCommand,
  GetObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { S3Factory } from './s3-factory';
import { AppConfigService } from '../app-config/app-config.service';
import { Readable } from 'stream';

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

  getObjectUrl(path: string): Promise<string> {
    return Promise.resolve(`https://${this.bucket}.s3.amazonaws.com/${path}`);
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
    try {
      await this.client.send(
        new HeadObjectCommand({
          Bucket: this.bucket,
          Key: path,
        }),
      );
    } catch (e) {
      return false;
    }

    return true;
  }

  async getObject(path: string): Promise<Readable> {
    const result = await this.client.send(
      new GetObjectCommand({
        Bucket: this.bucket,
        Key: path,
      }),
    );

    return <Readable>result.Body;
  }
}
