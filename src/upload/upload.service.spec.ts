import { Test, TestingModule } from '@nestjs/testing';
import { UploadService } from './upload.service';
import { FilesystemService } from '../filesystem/filesystem.service';

describe('UploadService', () => {
  let service: UploadService;

  const filesystemService = {
    write: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadService,
        {
          provide: FilesystemService,
          useValue: filesystemService,
        },
      ],
    }).compile();

    service = module.get<UploadService>(UploadService);
  });

  it('should upload the image', async () => {
    const File: jest.Mock<Express.Multer.File> = jest.fn();
    const upload = new File();
    upload.buffer = Buffer.from('content');
    upload.mimetype = 'jpeg';

    const result = await service.uploadImage({
      file: upload,
      filename: 'filename',
    });

    expect(filesystemService.write).toHaveBeenCalledWith(
      'filename',
      Buffer.from('content'),
    );

    expect(result).toStrictEqual({
      filename: 'filename',
      mimetype: 'jpeg',
    });
  });
});
