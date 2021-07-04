import { Test, TestingModule } from '@nestjs/testing';
import { ResizeService } from './resize.service';

describe('ResizeService', () => {
  let service: ResizeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResizeService],
    }).compile();

    service = module.get<ResizeService>(ResizeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
