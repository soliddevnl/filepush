import { Test, TestingModule } from '@nestjs/testing';
import { ResolverService } from './resolver.service';

describe('ResolverService', () => {
  let service: ResolverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResolverService],
    }).compile();

    service = module.get<ResolverService>(ResolverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
