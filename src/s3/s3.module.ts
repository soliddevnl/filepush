import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { AppConfigModule } from '../app-config/app-config.module';
import { S3Factory } from './s3-factory';

@Module({
  imports: [AppConfigModule],
  providers: [S3Service, S3Factory],
  exports: [S3Service],
})
export class S3Module {}
