import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private config: ConfigService) {}

  get imageDir(): string {
    return this.config.get<string>('APP_IMAGE_DIR');
  }

  get port(): string {
    return this.config.get<string>('APP_PORT');
  }
}
