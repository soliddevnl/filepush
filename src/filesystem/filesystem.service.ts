import { Inject, Injectable } from '@nestjs/common';
import { FileSystem } from './file-system.interface';

@Injectable()
export class FilesystemService implements FileSystem {
  constructor(@Inject('FileSystem') private adapter: FileSystem) {}

  exists(path: string): boolean {
    return this.adapter.exists(path);
  }

  read(path: string): Buffer {
    if (!this.exists(path)) {
      throw `File with path "${path}" does not exist`;
    }
    return this.adapter.read(path);
  }

  remove(path: string): void {
    return this.adapter.remove(path);
  }

  write(path: string, data: Buffer): Promise<void> {
    return this.adapter.write(path, data);
  }
}
