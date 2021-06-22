import { Test, TestingModule } from '@nestjs/testing';
import { FilesystemService } from './filesystem.service';
import { FileSystem } from './file-system.interface';

export class InMemoryFileSystem implements FileSystem {
  private files = new Map<string, string>();

  exists(path: string): boolean {
    return this.files.has(path);
  }

  read(path: string): Buffer {
    return Buffer.from(this.files.get(path));
  }

  remove(path: string): void {
    this.files.delete(path);
  }

  write(path: string, data: Buffer): Promise<void> {
    this.files.set(path, data.toString());

    return Promise.resolve(undefined);
  }
}

describe('FilesystemService', () => {
  let service: FilesystemService;
  let filesystem: FileSystem;

  beforeEach(async () => {
    filesystem = new InMemoryFileSystem();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilesystemService,
        {
          provide: 'FileSystem',
          useValue: filesystem,
        },
      ],
    }).compile();

    service = module.get<FilesystemService>(FilesystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return false when file does not exist', () => {
    const exists = service.exists('file-1');
    expect(exists).toStrictEqual(false);
  });

  it('should return true when file exists', () => {
    filesystem.write('file-1', Buffer.from('fake'));
    const exists = service.exists('file-1');
    expect(exists).toStrictEqual(true);
  });

  it('should return the file when reading an existing file', () => {
    filesystem.write('file-1', Buffer.from('fake data'));
    const content = service.read('file-1');
    expect(content.toString()).toStrictEqual('fake data');
  });

  it('should throw an error when reading an non-existing file', () => {
    expect(() => service.read('file-2')).toThrowError(
      'File with path "file-2" does not exist',
    );
  });

  it('should remove an existing file', () => {
    filesystem.write('file-1', Buffer.from('fake data'));
    expect(filesystem.exists('file-1')).toStrictEqual(true);

    service.remove('file-1');

    expect(filesystem.exists('file-1')).toStrictEqual(false);
  });

  it('should write a data to a file', () => {
    service.write('file-1', Buffer.from('fake data'));

    expect(filesystem.read('file-1').toString()).toStrictEqual('fake data');
  });
});
