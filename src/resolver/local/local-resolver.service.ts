import { Injectable } from '@nestjs/common';
import { Resolver } from '../resolver.service';
import { FilesystemService } from '../../filesystem/filesystem.service';

@Injectable()
export class LocalResolverService implements Resolver {
  constructor(private fileSystem: FilesystemService) {}

  isStored(path: string): Promise<boolean> {
    return Promise.resolve(this.fileSystem.exists(path));
  }

  remove(paths: Array<string>): Promise<void> {
    for (const path of paths) {
      if (!this.fileSystem.exists(path)) {
        return;
      }

      this.fileSystem.remove(path);
    }

    return Promise.resolve();
  }

  resolve(path: string): Promise<string> {
    return Promise.resolve(path);
  }

  store(data: Buffer, path: string): Promise<void> {
    this.fileSystem.write(path, data);

    return Promise.resolve();
  }
}
