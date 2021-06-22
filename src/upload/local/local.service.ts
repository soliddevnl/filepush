import { Injectable } from '@nestjs/common';
import { UploadImage } from '../dto';
import { Uploader } from '../uploader.interface';
import { FilesystemService } from '../../filesystem/filesystem.service';
import { AppConfigService } from '../../app-config/app-config.service';

@Injectable()
export class LocalService implements Uploader {
  constructor(
    private filesystem: FilesystemService,
    private config: AppConfigService,
  ) {}

  async upload(request: UploadImage): Promise<void> {
    const path = `${this.config.fileDir}/${request.filename}`;

    await this.filesystem.write(path, request.file.buffer);

    return Promise.resolve(undefined);
  }
}
