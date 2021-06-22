import { Test, TestingModule } from '@nestjs/testing';
import { LocalService } from './local.service';
import { FilesystemService } from '../../filesystem/filesystem.service';
import { AppConfigService } from '../../app-config/app-config.service';
import { InMemoryFileSystem } from '../../filesystem/filesystem.service.spec';

describe('LocalService', () => {
  let service: LocalService;

  beforeEach(async () => {
    const ConfigMock = jest.fn(() => ({}));

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalService,
        FilesystemService,
        {
          provide: AppConfigService,
          useValue: ConfigMock,
        },
        {
          provide: 'FileSystem',
          useValue: new InMemoryFileSystem(),
        },
      ],
    }).compile();

    service = module.get<LocalService>(LocalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
