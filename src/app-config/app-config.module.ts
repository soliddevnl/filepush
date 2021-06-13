import { Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [AppConfigService],
  exports: [AppConfigService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppConfigModule {}
