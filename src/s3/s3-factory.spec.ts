import { Test, TestingModule } from '@nestjs/testing';
import { S3Factory } from './s3-factory';

describe('S3ClientFactory', () => {
  let provider: S3Factory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [S3Factory],
    }).compile();

    provider = module.get<S3Factory>(S3Factory);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
