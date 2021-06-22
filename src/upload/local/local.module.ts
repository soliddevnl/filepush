import { Module } from '@nestjs/common';
import { LocalService } from './local.service';
import { FilesystemModule } from '../../filesystem/filesystem.module';
import { AppConfigService } from '../../app-config/app-config.service';

@Module({
  imports: [FilesystemModule],
  providers: [
    LocalService,
    AppConfigService,
    {
      provide: 'Uploader',
      useClass: LocalService,
    },
  ],
  exports: ['Uploader'],
})
export class LocalModule {}
