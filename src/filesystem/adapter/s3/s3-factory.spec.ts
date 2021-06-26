import { Test, TestingModule } from '@nestjs/testing';
import { S3Factory } from './s3-factory';

describe('S3ClientFactory', () => {
  let s3Factory: S3Factory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [S3Factory],
    }).compile();

    s3Factory = module.get<S3Factory>(S3Factory);
  });

  it('should be defined', () => {
    expect(s3Factory).toBeDefined();
  });

  it('should create an new client', () => {
    const client = s3Factory.create({
      region: 'my-region',
    });

    expect(client.config.apiVersion).toStrictEqual('2006-03-01');
  });
});
