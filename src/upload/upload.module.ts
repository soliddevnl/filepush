import { DynamicModule } from '@nestjs/common';
import { UploadService } from './upload.service';
import { AppConfigModule } from '../app-config/app-config.module';
import { UploadController } from './upload.controller';
import { StaticConfigService } from './static-config.service';
import { ResolverModule } from '../resolver/resolver.module';
import { LocalModule } from './local/local.module';
import { S3UploaderModule } from './s3-uploader/s3-uploader.module';

interface UploadModuleOptions {
  filesystem: string | 's3' | 'local';
}

export class UploadModule {
  static registerAsync(options: UploadModuleOptions): DynamicModule {
    const imports = [AppConfigModule, ResolverModule];

    if (options.filesystem === 's3') {
      imports.push(S3UploaderModule);
    } else {
      imports.push(LocalModule);
    }

    return {
      module: UploadModule,
      imports: imports,
      controllers: [UploadController],
      providers: [UploadService, StaticConfigService],
      exports: [UploadService, StaticConfigService],
    };
  }
}
