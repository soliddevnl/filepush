import { Test, TestingModule } from '@nestjs/testing';
import { S3UploadService } from './s3-uploader.service';
import { S3Service } from '../../s3/s3.service';

describe('S3Service', () => {
  let service: S3UploadService;
  const s3Service = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        S3UploadService,
        {
          provide: S3Service,
          useValue: s3Service,
        },
      ],
    }).compile();

    service = module.get<S3UploadService>(S3UploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
