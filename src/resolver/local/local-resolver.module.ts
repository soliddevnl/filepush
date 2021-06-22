import { Module } from '@nestjs/common';
import { LocalResolverService } from './local-resolver.service';
import { FilesystemModule } from '../../filesystem/filesystem.module';

@Module({
  imports: [FilesystemModule],
  providers: [LocalResolverService],
})
export class LocalResolverModule {}
