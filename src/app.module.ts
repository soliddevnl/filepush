import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config/app-config.module';
import { UploadModule } from './upload/upload.module';
import { FilesystemModule } from './filesystem/filesystem.module';
import { DownloadModule } from './download/download.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AppConfigModule,
    UploadModule,
    FilesystemModule,
    DownloadModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
