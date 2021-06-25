import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import { AdapterFactory } from './adapter/adapter.factory';

@Injectable()
export class FilesystemService {
  constructor(private adapterFactory: AdapterFactory) {}

  createReadStream(path: string): Promise<Readable> {
    return this.adapterFactory.create().createReadStream(path);
  }

  async write(path: string, buffer: Buffer): Promise<void> {
    return this.adapterFactory.create().write(path, buffer);
  }
}
