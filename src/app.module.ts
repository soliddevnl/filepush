import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config/app-config.module';
import { UploadModule } from './upload/upload.module';
import { ResolverModule } from './resolver/resolver.module';
import { LocalResolverModule } from './resolver/local/local-resolver.module';
import { S3ResolverModule } from './resolver/s3/s3-resolver.module';
import { FilesystemModule } from './filesystem/filesystem.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    AppConfigModule,
    UploadModule.registerAsync({
      filesystem: process.env.APP_FILESYSTEM,
    }),
    ResolverModule,
    LocalResolverModule,
    S3ResolverModule,
    FilesystemModule,
    S3Module,
  ],
})
export class AppModule {}
