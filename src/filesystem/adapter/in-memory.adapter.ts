import { Injectable } from '@nestjs/common';
import { FilesystemAdapter } from '../filesystem-adapter.interface';
import { Readable } from 'stream';
import { FilesystemChoices } from '../../app-config/app-config.service';

@Injectable()
export class InMemoryAdapter implements FilesystemAdapter {
  private files = new Map<string, string>();

  exists(path: string): Promise<boolean> {
    return Promise.resolve(this.files.has(path));
  }

  remove(path: string): Promise<void> {
    this.files.delete(path);

    return Promise.resolve();
  }

  write(path: string, data: Buffer): Promise<void> {
    this.files.set(path, data.toString());

    return Promise.resolve(undefined);
  }

  createReadStream(path: string): Promise<Readable> {
    if (!this.files.has(path)) {
      return Promise.reject('File does not exist');
    }
    return Promise.resolve(Readable.from(this.files.get(path).toString()));
  }

  handles(filesystem: FilesystemChoices): boolean {
    return filesystem === 'in-memory';
  }
}
