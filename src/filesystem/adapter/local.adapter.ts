import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { FilesystemAdapter } from '../filesystem-adapter.interface';
import { Readable } from 'stream';
import {
  AppConfigService,
  FilesystemChoices,
} from '../../app-config/app-config.service';

@Injectable()
export class LocalAdapter implements FilesystemAdapter {
  constructor(private config: AppConfigService) {}

  exists(filePath: string): Promise<boolean> {
    return Promise.resolve(
      fs.existsSync(path.join(this.config.fileDir, filePath)),
    );
  }

  remove(filePath: string): Promise<void> {
    fs.unlinkSync(path.join(this.config.fileDir, filePath));

    return Promise.resolve();
  }

  write(filePath: string, data: Buffer): Promise<void> {
    fs.writeFileSync(path.join(this.config.fileDir, filePath), data);

    return Promise.resolve();
  }

  createReadStream(filePath: string): Promise<Readable> {
    const localPath = path.join(this.config.fileDir, filePath);
    if (!fs.existsSync(localPath)) {
      return Promise.reject('File does not exist');
    }

    return Promise.resolve(
      fs.createReadStream(path.join(this.config.fileDir, filePath)),
    );
  }

  handles(filesystem: FilesystemChoices): boolean {
    return filesystem === 'local';
  }
}
