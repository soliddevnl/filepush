import { Module } from '@nestjs/common';
import { FsResolverService } from './fs-resolver.service';
import { FilesystemModule } from '../filesystem/filesystem.module';

@Module({
  imports: [FilesystemModule],
  providers: [FsResolverService],
})
export class FsResolverModule {}
