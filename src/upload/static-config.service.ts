import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../app-config/app-config.service';
import {
  ServeStaticModuleOptions,
  ServeStaticModuleOptionsFactory,
} from '@nestjs/serve-static';

@Injectable()
export class StaticConfigService implements ServeStaticModuleOptionsFactory {
  constructor(private config: AppConfigService) {}

  createLoggerOptions(): ServeStaticModuleOptions[] {
    return [
      {
        rootPath: this.config.fileDir,
      },
    ];
  }
}
