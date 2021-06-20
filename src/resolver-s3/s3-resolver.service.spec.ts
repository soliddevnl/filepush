import { Test, TestingModule } from '@nestjs/testing';
import { S3ResolverService } from './s3-resolver.service';

describe('S3ResolverService', () => {
  let service: S3ResolverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [S3ResolverService],
    }).compile();

    service = module.get<S3ResolverService>(S3ResolverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
