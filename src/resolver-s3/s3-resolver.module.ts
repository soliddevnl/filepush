import { Module } from '@nestjs/common';
import { S3ResolverService } from './s3-resolver.service';
import { S3ClientFactory } from './s3-client-factory';
import { AppConfigModule } from '../app-config/app-config.module';

@Module({
  providers: [S3ResolverService, S3ClientFactory],
  imports: [AppConfigModule],
  exports: [S3ResolverService],
})
export class S3ResolverModule {}
