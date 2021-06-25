import {
  AppConfigServiceInterface,
  FilesystemChoices,
  S3Config,
} from './app-config.service';

export class AppConfigServiceTest implements AppConfigServiceInterface {
  private _fileDir: string;
  private _port: string;
  private _filesystemChoice: FilesystemChoices;
  private _s3: S3Config;

  get fileDir(): string {
    return this._fileDir;
  }

  get port(): string {
    return this._port;
  }

  get filesystem(): FilesystemChoices {
    return this._filesystemChoice;
  }

  get s3(): S3Config {
    return {
      region: this._s3.region,
      bucket: this._s3.bucket,
      key: this._s3.key,
      secret: this._s3.secret,
    };
  }

  setFileDir(value: string) {
    this._fileDir = value;
  }

  setPort(value: string) {
    this._port = value;
  }

  setFilesystem(value: FilesystemChoices) {
    this._filesystemChoice = value;
  }

  setS3(value: S3Config) {
    this._s3 = value;
  }
}
