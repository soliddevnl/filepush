import { Injectable } from '@nestjs/common';
import { UploadImage } from '../dto';
import { Uploader } from '../uploader.interface';
import { FilesystemService } from '../../filesystem/filesystem.service';

@Injectable()
export class LocalService implements Uploader {
  constructor(private filesystem: FilesystemService) {}

  async upload(request: UploadImage): Promise<void> {
    const path = `/images/${request.filename}`;

    await this.filesystem.write(path, request.file.buffer);

    return Promise.resolve(undefined);
  }
}
