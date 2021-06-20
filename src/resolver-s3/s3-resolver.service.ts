import { Injectable } from '@nestjs/common';
import { Resolver } from '../resolver/resolver.service';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectsCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import { S3ClientFactory } from './s3-client-factory';
import { AppConfigService } from '../app-config/app-config.service';

@Injectable()
export class S3ResolverService implements Resolver {
  private storage: S3Client;
  private bucket: string;

  constructor(clientFactory: S3ClientFactory, appConfig: AppConfigService) {
    this.storage = clientFactory.create({
      region: 'eu-central-1',
      credentials: {
        accessKeyId: 'AKIAWICX23AH6GXUPM7C',
        secretAccessKey: '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',
      },
    });

    this.bucket = appConfig.bucket;
  }

  async isStored(path: string): Promise<boolean> {
    const command = new HeadObjectCommand({
      Bucket: this.bucket,
      Key: path,
    });

    console.log(command);

    try {
      await this.storage.send(command);
    } catch (e) {
      console.error(e);
      return false;
    }

    return true;
  }

  async remove(paths: Array<string>): Promise<void> {
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

    await this.storage.send(command);
  }

  async resolve(path: string): Promise<string> {
    return `https://${this.bucket}.s3.amazonaws.com/${path}`;
  }

  async store(data: Buffer, path: string): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: path,
    });

    await this.storage.send(command);
  }
}
