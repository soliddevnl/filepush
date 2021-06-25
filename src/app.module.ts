import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config/app-config.module';
import { UploadModule } from './upload/upload.module';
import { FilesystemModule } from './filesystem/filesystem.module';
import { S3Module } from './s3/s3.module';
import { DownloadModule } from './download/download.module';

@Module({
  imports: [
    AppConfigModule,
    UploadModule,
    FilesystemModule,
    S3Module,
    DownloadModule,
  ],
  providers: [],
})
export class AppModule {}
