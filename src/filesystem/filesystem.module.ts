import { Module } from '@nestjs/common';
import { FilesystemService } from './filesystem.service';
import { FileSystemSync } from './file-system-local';

@Module({
  providers: [
    FilesystemService,
    {
      provide: 'FileSystem',
      useClass: FileSystemSync,
    },
  ],
  exports: [FilesystemService],
})
export class FilesystemModule {}
