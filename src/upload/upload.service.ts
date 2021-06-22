import { Inject, Injectable } from '@nestjs/common';
import { AppConfigService } from '../app-config/app-config.service';
import * as fs from 'fs';
import { randomUUID } from 'crypto';
import * as sharp from 'sharp';
import { DownloadImage, UploadImage } from './dto';
import { ResolverService } from '../resolver/resolver.service';
import { Uploader } from './uploader.interface';

@Injectable()
export class UploadService {
  constructor(
    private config: AppConfigService,
    private resolver: ResolverService,
    @Inject('Uploader') private uploader: Uploader,
  ) {}

  generateFilename(): string {
    return randomUUID();
  }

  async uploadImage(request: UploadImage) {
    await this.uploader.upload(request);

    return {
      filename: request.file.filename,
      mimetype: request.file.mimetype,
    };
  }

  async getImage(request: DownloadImage) {
    const resolvedPath = await this.resolver.resolve(request.filename);
    console.log(resolvedPath);
    return resolvedPath;

    const path = this.config.fileDir + '/' + request.filename;

    const fileExists = fs.existsSync(path);
    if (!fileExists) {
      return null;
    }

    const image = fs.readFileSync(path);

    if (!request.width && !request.height) {
      return image;
    }

    const options = {
      width: request.width,
      height: request.height,
    };

    return await sharp(image).resize(options).toBuffer();
  }
}
