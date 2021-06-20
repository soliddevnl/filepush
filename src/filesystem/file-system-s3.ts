import { Injectable } from '@nestjs/common';
import { FileSystem } from './file-system.interface';
import * as fs from 'fs';

@Injectable()
export class FileSystemS3 implements FileSystem {
  exists(path: string): boolean {
    return fs.existsSync(path);
  }

  remove(path: string): void {
    fs.unlinkSync(path);
  }

  read(path: string): Buffer {
    return fs.readFileSync(path);
  }

  write(path: string, data: Buffer): Promise<void> {
    fs.writeFileSync(path, data);

    return Promise.resolve();
  }
}
