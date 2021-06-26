import { S3Adapter } from './s3.adapter';
import { Test, TestingModule } from '@nestjs/testing';
import { S3Service } from './s3/s3.service';

describe('S3Adapter', () => {
  let s3Adapter: S3Adapter;

  const s3Service = {
    objectExists: jest.fn(),
    deleteObjects: jest.fn(),
    putObject: jest.fn(),
    getObject: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        S3Adapter,
        {
          provide: S3Service,
          useValue: s3Service,
        },
      ],
    }).compile();

    s3Adapter = module.get<S3Adapter>(S3Adapter);
  });

  it('returns false when file does not exist', async () => {
    jest.spyOn(s3Service, 'objectExists').mockResolvedValue(false);

    expect(await s3Adapter.exists('file-1')).toBe(false);
  });

  it('returns true when file exists', async () => {
    jest.spyOn(s3Service, 'objectExists').mockResolvedValue(true);

    expect(await s3Adapter.exists('file-1')).toBe(true);
  });

  it('removes a file', async () => {
    await s3Adapter.remove('file-1');
    expect(s3Service.deleteObjects.mock.calls[0][0]).toStrictEqual(['file-1']);
  });

  it('writes a file', async () => {
    await s3Adapter.write('file-1', Buffer.from('content'));

    expect(s3Service.putObject.mock.calls[0]).toEqual([
      'file-1',
      Buffer.from('content'),
    ]);
  });

  it('creates a Readable Stream', async () => {
    await s3Adapter.createReadStream('file-1');

    expect(s3Service.getObject.mock.calls[0][0]).toEqual('file-1');
  });

  it('handles the correct adapter', async () => {
    expect(s3Adapter.handles('s3')).toBe(true);
  });
});
