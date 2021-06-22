import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3Factory } from './s3-factory';
import { AppConfigModule } from '../app-config/app-config.module';

@Module({
  imports: [S3Factory, AppConfigModule],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
