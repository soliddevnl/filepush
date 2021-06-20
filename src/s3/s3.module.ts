import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3Factory } from './s3-factory';

@Module({
  imports: [S3Factory],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
