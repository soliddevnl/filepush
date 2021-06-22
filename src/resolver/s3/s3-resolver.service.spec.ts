import { Test, TestingModule } from '@nestjs/testing';
import { S3ResolverService } from './s3-resolver.service';
import { S3Service } from '../../s3/s3.service';
import { AppConfigService } from '../../app-config/app-config.service';

export class S3ServiceSpy extends S3Service {
  private objects: Map<string, string>;

  async deleteObjects(paths: Array<string>): Promise<void> {
    paths.map((path) => this.objects.delete(path));

    return Promise.resolve();
  }

  getObjectUrl(path: string): string {
    return `test/${path}`;
  }

  async objectExists(path: string): Promise<boolean> {
    return Promise.resolve(this.objects.has(path));
  }

  async putObject(path: string, data: Buffer): Promise<void> {
    this.objects.set(path, data.toString());
    return Promise.resolve();
  }
}

describe('S3ResolverService', () => {
  let service: S3ResolverService;
  const config = {
    get s3() {
      return {
        bucket: 'test-bucket',
        region: 'test',
      };
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        S3ResolverService,
        {
          provide: S3Service,
          useValue: S3ServiceSpy,
        },
        {
          provide: AppConfigService,
          useValue: config,
        },
      ],
    }).compile();

    service = module.get<S3ResolverService>(S3ResolverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
