import { Module } from '@nestjs/common';
import { DownloadService } from './download.service';
import { DownloadController } from './download.controller';
import { FilesystemModule } from '../filesystem/filesystem.module';

@Module({
  imports: [FilesystemModule],
  providers: [DownloadService],
  controllers: [DownloadController],
})
export class DownloadModule {}
