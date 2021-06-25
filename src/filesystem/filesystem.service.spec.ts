import { Test, TestingModule } from '@nestjs/testing';
import { FilesystemService } from './filesystem.service';
import { AdapterFactory } from './adapter/adapter.factory';

describe('FilesystemService', () => {
  let service: FilesystemService;

  const adapterFactory = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilesystemService,
        {
          provide: AdapterFactory,
          useValue: adapterFactory,
        },
      ],
    }).compile();

    service = module.get<FilesystemService>(FilesystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
