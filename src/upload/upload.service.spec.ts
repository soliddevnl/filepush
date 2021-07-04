import { Test, TestingModule } from '@nestjs/testing';
import { UploadService } from './upload.service';
import { FilesystemService } from '../filesystem/filesystem.service';
import { ResizeService } from './resize/resize.service';

describe('UploadService', () => {
  let service: UploadService;

  const filesystemService = {
    write: jest.fn(),
  };

  const resizeService = {
    resize: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadService,
        {
          provide: FilesystemService,
          useValue: filesystemService,
        },
        {
          provide: ResizeService,
          useValue: resizeService,
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

    const result = await service.uploadFile({
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

  it('should resize the image before upload', async () => {
    const File: jest.Mock<Express.Multer.File> = jest.fn();
    const upload = new File();
    upload.buffer = Buffer.from('content');
    upload.mimetype = 'jpeg';

    resizeService.resize.mockResolvedValue(Buffer.from('resized content'));

    const result = await service.uploadFile({
      file: upload,
      filename: 'filename',
      width: 100,
      height: 100,
    });

    expect(resizeService.resize).toHaveBeenCalledWith(upload.buffer, {
      width: 100,
      height: 100,
    });

    expect(filesystemService.write).toHaveBeenCalledWith(
      'filename',
      Buffer.from('resized content'),
    );

    expect(result).toStrictEqual({
      filename: 'filename',
      mimetype: 'jpeg',
    });
  });
});
