import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UploadFile } from './dto';
import { FilesystemService } from '../filesystem/filesystem.service';

@Injectable()
export class UploadService {
  constructor(private filesystem: FilesystemService) {}

  generateFilename(): string {
    return randomUUID();
  }

  async uploadImage(request: UploadFile) {
    await this.filesystem.write(request.filename, request.file.buffer);

    return {
      filename: request.filename,
      mimetype: request.file.mimetype,
    };
  }
}
