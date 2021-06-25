import { Injectable } from '@nestjs/common';
import { FilesystemService } from '../filesystem/filesystem.service';
import { Readable } from 'stream';

@Injectable()
export class DownloadService {
  constructor(private filesystemService: FilesystemService) {}

  async downloadFile(path: string): Promise<Readable> {
    return this.filesystemService.createReadStream(path);
  }
}
