import { Module } from '@nestjs/common';
import { ResolverService } from './resolver.service';
import { S3ResolverModule } from '../resolver-s3/s3-resolver.module';

@Module({
  providers: [ResolverService],
  imports: [S3ResolverModule],
  exports: [ResolverService],
})
export class ResolverModule {}
