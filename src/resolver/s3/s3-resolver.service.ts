import { Injectable } from '@nestjs/common';
import { Resolver } from '../resolver.service';
import { AppConfigService } from '../../app-config/app-config.service';
import { S3Service } from '../../s3/s3.service';

@Injectable()
export class S3ResolverService implements Resolver {
  private bucket: string;

  constructor(private s3Service: S3Service, appConfig: AppConfigService) {
    this.bucket = appConfig.s3.bucket;
  }

  async isStored(path: string): Promise<boolean> {
    return this.s3Service.objectExists(path);
  }

  async remove(paths: Array<string>): Promise<void> {
    return this.s3Service.deleteObjects(paths);
  }

  async resolve(path: string): Promise<string> {
    return this.s3Service.getObjectUrl(path);
  }

  async store(data: Buffer, path: string): Promise<void> {
    return this.s3Service.putObject(path, data);
  }
}
