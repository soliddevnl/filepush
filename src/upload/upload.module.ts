import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { AppConfigModule } from '../app-config/app-config.module';
import { UploadController } from './upload.controller';
import { StaticConfigService } from './static-config.service';
import { ResolverModule } from '../resolver/resolver.module';
import { LocalModule } from './local/local.module';
import { FilesystemModule } from '../filesystem/filesystem.module';
import { S3UploaderModule } from './s3-uploader/s3-uploader.module';

@Module({
  imports: [
    AppConfigModule,
    ResolverModule,
    LocalModule,
    FilesystemModule,
    S3UploaderModule,
  ],
  controllers: [UploadController],
  providers: [UploadService, StaticConfigService],
  exports: [UploadService, StaticConfigService],
})
export class UploadModule {}
