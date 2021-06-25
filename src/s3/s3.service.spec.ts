import { Test, TestingModule } from '@nestjs/testing';
import { S3Service } from './s3.service';
import { AppConfigService } from '../app-config/app-config.service';
import { S3Factory } from './s3-factory';

describe('S3Service', () => {
  let service: S3Service;
  const config = {
    get s3() {
      return {
        bucket: 'test-bucket',
      };
    },
  };

  const s3Client = {
    send: jest.fn(),
  };

  const s3Factory = {
    create: () => s3Client,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        S3Service,
        {
          provide: AppConfigService,
          useValue: config,
        },
        {
          provide: S3Factory,
          useValue: s3Factory,
        },
      ],
    }).compile();

    service = module.get<S3Service>(S3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should put the object', () => {
    const data = Buffer.from('test');
    service.putObject('file-1', data);

    const command = {
      Bucket: 'test-bucket',
      Key: 'file-1',
      Body: data,
    };

    const spy = jest.spyOn(s3Client, 'send');

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].input).toStrictEqual(command);

    spy.mockClear();
  });

  it('should delete objects', () => {
    service.deleteObjects(['file-1', 'file-2']);

    const command = {
      Bucket: 'test-bucket',
      Delete: {
        Objects: [{ Key: 'file-1' }, { Key: 'file-2' }],
        Quiet: false,
      },
    };

    const spy = jest.spyOn(s3Client, 'send');

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].input).toStrictEqual(command);
    spy.mockClear();
  });

  it('should get the object url', async () => {
    expect(await service.getObjectUrl('file-1')).toBe(
      'https://test-bucket.s3.amazonaws.com/file-1',
    );
  });

  it('should check if and object exists', async () => {
    const spy = jest.spyOn(s3Client, 'send');

    const objectExists = await service.objectExists('file-1');

    const command = {
      Bucket: 'test-bucket',
      Key: 'file-1',
    };

    expect(objectExists).toStrictEqual(true);
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].input).toStrictEqual(command);
    spy.mockClear();
  });

  it('should handles errors when checking is object exists', async () => {
    const spy = jest.spyOn(s3Client, 'send');
    spy.mockRejectedValue('Something went wrong');

    const command = {
      Bucket: 'test-bucket',
      Key: 'file-1',
    };

    const objectExists = await service.objectExists('file-1');

    expect(objectExists).toStrictEqual(false);
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].input).toStrictEqual(command);
    spy.mockClear();
  });
});
