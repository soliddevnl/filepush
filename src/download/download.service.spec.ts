import { Test, TestingModule } from '@nestjs/testing';
import { DownloadService } from './download.service';
import { FilesystemService } from '../filesystem/filesystem.service';
import { AdapterFactory } from '../filesystem/adapter/adapter.factory';
import { InMemoryAdapter } from '../filesystem/adapter/in-memory.adapter';

describe('DownloadService', () => {
  let service: DownloadService;

  const adapterFactory = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DownloadService,
        FilesystemService,
        {
          provide: AdapterFactory,
          useValue: adapterFactory,
        },
      ],
    }).compile();

    service = module.get<DownloadService>(DownloadService);
  });

  it('should resolve the file', async () => {
    const filesystem = new InMemoryAdapter();
    await filesystem.write('file-1', Buffer.from('content'));

    adapterFactory.create.mockReturnValue(filesystem);

    const result = await service.downloadFile('file-1');

    expect(result.read()).toStrictEqual('content');
  });
});
