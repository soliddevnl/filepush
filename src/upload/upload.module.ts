import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { AppConfigModule } from '../app-config/app-config.module';
import { MulterConfigService } from './multer-config.service';
import { UploadController } from './upload.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { StaticConfigService } from './static-config.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useExisting: MulterConfigService,
      imports: [AppConfigModule, UploadModule],
    }),
    ServeStaticModule.forRootAsync({
      useExisting: StaticConfigService,
      imports: [AppConfigModule, UploadModule],
    }),
    AppConfigModule,
  ],
  controllers: [UploadController],
  providers: [UploadService, MulterConfigService, StaticConfigService],
  exports: [UploadService, MulterConfigService, StaticConfigService],
})
export class UploadModule {}
