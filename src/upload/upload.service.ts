import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UploadFileDto } from './dto';
import { FilesystemService } from '../filesystem/filesystem.service';
import { ResizeService } from './resize/resize.service';

@Injectable()
export class UploadService {
  constructor(
    private filesystem: FilesystemService,
    private resizeService: ResizeService,
  ) {}

  generateFilename(): string {
    return randomUUID();
  }

  async uploadFile(request: UploadFileDto) {
    let fileBuffer = request.file.buffer;

    if (this.isImage(request) && request.width && request.height) {
      fileBuffer = await this.resizeService.resize(request.file.buffer, {
        width: request.width,
        height: request.height,
      });
    }

    await this.filesystem.write(request.filename, fileBuffer);

    return {
      filename: request.filename,
      mimetype: request.file.mimetype,
    };
  }

  private isImage(request: UploadFileDto): boolean {
    return request.file.mimetype.includes('image');
  }
}
