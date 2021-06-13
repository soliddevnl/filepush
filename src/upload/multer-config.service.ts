import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { AppConfigService } from '../app-config/app-config.service';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(private config: AppConfigService) {}

  createMulterOptions(): MulterModuleOptions {
    return {
      dest: this.config.imageDir,
    };
  }
}
