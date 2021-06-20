import { Test, TestingModule } from '@nestjs/testing';
import { FsResolverService } from './fs-resolver.service';

describe('FsResolverService', () => {
  let service: FsResolverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FsResolverService],
    }).compile();

    service = module.get<FsResolverService>(FsResolverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
