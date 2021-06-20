import { Injectable } from '@nestjs/common';
import { Uploader } from '../uploader.interface';
import { UploadImage } from '../dto';
import { S3Service } from '../../s3/s3.service';
import { AppConfigService } from '../../app-config/app-config.service';

@Injectable()
export class S3UploadService implements Uploader {
  constructor(private s3: S3Service, private config: AppConfigService) {}

  async upload(request: UploadImage): Promise<void> {
    await this.s3.putObject(
      this.config.bucket,
      request.filename,
      request.file.buffer,
    );
  }
}
