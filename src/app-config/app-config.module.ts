import { Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      validationSchema: Joi.object({
        APP_PORT: Joi.number().default(5000),
        APP_FILESYSTEM: Joi.string()
          .valid('local', 's3', 'in-memory')
          .default('local'),
        APP_FILE_DIR: Joi.when('APP_FILESYSTEM', {
          is: 'local',
          then: Joi.string().required().default('/files'),
        }),
        APP_S3_REGION: Joi.when('APP_FILESYSTEM', {
          is: 's3',
          then: Joi.string().required(),
        }),
        APP_S3_BUCKET: Joi.when('APP_FILESYSTEM', {
          is: 's3',
          then: Joi.string().required(),
        }),
        APP_S3_KEY: Joi.when('APP_FILESYSTEM', {
          is: 's3',
          then: Joi.string().required(),
        }),
        APP_S3_SECRET: Joi.when('APP_FILESYSTEM', {
          is: 's3',
          then: Joi.string().required(),
        }),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
