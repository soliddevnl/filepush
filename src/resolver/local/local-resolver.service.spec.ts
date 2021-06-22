import { Test, TestingModule } from '@nestjs/testing';
import { LocalResolverService } from './local-resolver.service';
import { FilesystemService } from '../../filesystem/filesystem.service';
import { InMemoryFileSystem } from '../../filesystem/filesystem.service.spec';

describe('LocalResolverService', () => {
  let service: LocalResolverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalResolverService,
        FilesystemService,
        {
          provide: 'FileSystem',
          useValue: new InMemoryFileSystem(),
        },
      ],
    }).compile();

    service = module.get<LocalResolverService>(LocalResolverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
