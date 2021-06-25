import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface S3Config {
  region: string;
  bucket: string;
  key: string;
  secret: string;
}

export type FilesystemChoices = 'local' | 's3' | 'in-memory';

export interface AppConfigServiceInterface {
  get fileDir(): string;
  get port(): string;
  get filesystem(): FilesystemChoices;
  get s3(): S3Config;
}

@Injectable()
export class AppConfigService implements AppConfigServiceInterface {
  constructor(private config: ConfigService) {}

  get fileDir(): string {
    return this.config.get<string>('APP_FILE_DIR');
  }

  get port(): string {
    return this.config.get<string>('APP_PORT');
  }

  get filesystem(): FilesystemChoices {
    return this.config.get<FilesystemChoices>('APP_FILESYSTEM');
  }

  get s3(): S3Config {
    return {
      region: this.config.get<string>('APP_S3_REGION'),
      bucket: this.config.get<string>('APP_S3_BUCKET'),
      key: this.config.get<string>('APP_S3_KEY'),
      secret: this.config.get<string>('APP_S3_SECRET'),
    };
  }
}
