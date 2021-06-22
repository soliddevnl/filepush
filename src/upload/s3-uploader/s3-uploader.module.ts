import { Module } from '@nestjs/common';
import { S3Module } from '../../s3/s3.module';
import { S3UploadService } from './s3-uploader.service';
import { AppConfigModule } from '../../app-config/app-config.module';

@Module({
  imports: [S3Module, AppConfigModule],
  providers: [
    S3UploadService,
    {
      provide: 'Uploader',
      useClass: S3UploadService,
    },
  ],
  exports: ['Uploader'],
})
export class S3UploaderModule {}
