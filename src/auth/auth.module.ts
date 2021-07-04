import { Module } from '@nestjs/common';
import { AppConfigModule } from '../app-config/app-config.module';
import { PassportModule } from '@nestjs/passport';
import { HeaderApiKeyStrategy } from './auth-header-api-key.strategy';

@Module({
  imports: [AppConfigModule, PassportModule],
  providers: [HeaderApiKeyStrategy],
})
export class AuthModule {}
