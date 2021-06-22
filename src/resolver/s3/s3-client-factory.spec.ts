import { Test, TestingModule } from '@nestjs/testing';
import { S3ClientFactory } from './s3-client-factory';

describe('S3ClientFactory', () => {
  let provider: S3ClientFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [S3ClientFactory],
    }).compile();

    provider = module.get<S3ClientFactory>(S3ClientFactory);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
