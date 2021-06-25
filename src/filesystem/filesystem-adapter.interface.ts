import { Readable } from 'stream';
import { FilesystemChoices } from '../app-config/app-config.service';

export interface FilesystemAdapter {
  exists(path: string): Promise<boolean>;

  remove(path: string): Promise<void>;

  write(path: string, data: Buffer): Promise<void>;

  createReadStream(path: string): Promise<Readable>;

  handles(filesystem: FilesystemChoices): boolean;
}
