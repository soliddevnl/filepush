import { Injectable } from '@nestjs/common';
import { Uploader } from '../uploader.interface';
import { UploadImage } from '../dto';
import { S3Service } from '../../s3/s3.service';

@Injectable()
export class S3UploadService implements Uploader {
  constructor(private s3: S3Service) {}

  async upload(request: UploadImage): Promise<void> {
    await this.s3.putObject(request.filename, request.file.buffer);
  }
}
