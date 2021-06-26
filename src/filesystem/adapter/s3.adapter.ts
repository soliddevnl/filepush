import { Injectable } from '@nestjs/common';
import { FilesystemAdapter } from '../filesystem-adapter.interface';
import { Readable } from 'stream';
import { FilesystemChoices } from '../../app-config/app-config.service';
import { S3Service } from './s3/s3.service';

@Injectable()
export class S3Adapter implements FilesystemAdapter {
  constructor(private s3Service: S3Service) {}

  exists(path: string): Promise<boolean> {
    return this.s3Service.objectExists(path);
  }

  remove(path: string): Promise<void> {
    return this.s3Service.deleteObjects([path]);
  }

  write(path: string, data: Buffer): Promise<void> {
    return this.s3Service.putObject(path, data);
  }

  createReadStream(path: string): Promise<Readable> {
    return this.s3Service.getObject(path);
  }

  handles(filesystem: FilesystemChoices): boolean {
    return filesystem === 's3';
  }
}
