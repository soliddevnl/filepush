import { Module } from '@nestjs/common';
import { LocalService } from './local.service';
import { FilesystemModule } from '../../filesystem/filesystem.module';

@Module({
  imports: [FilesystemModule],
  providers: [LocalService],
})
export class LocalModule {}
