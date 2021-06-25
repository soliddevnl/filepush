import { Injectable } from '@nestjs/common';
import { AppConfigServiceInterface } from '../../app-config/app-config.service';
import { FilesystemAdapter } from '../filesystem-adapter.interface';

@Injectable()
export class AdapterFactory {
  constructor(
    private config: AppConfigServiceInterface,
    private adapters: Array<FilesystemAdapter>,
  ) {}

  create(): FilesystemAdapter {
    const filesystem = this.config.filesystem;
    for (let i = 0; i < this.adapters.length; i++) {
      const adapter = this.adapters[i];
      if (adapter.handles(filesystem)) {
        return adapter;
      }
    }
    throw new Error(`Could not create adapter for "${filesystem}"`);
  }
}
