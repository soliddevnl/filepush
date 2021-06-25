import { InMemoryAdapter } from './in-memory.adapter';
import { Readable } from 'stream';

describe('InMemoryAdapter', () => {
  let inMemoryAdapter: InMemoryAdapter;

  beforeEach(async () => {
    inMemoryAdapter = new InMemoryAdapter();
  });

  it('returns false when file does not exists', async () => {
    expect(await inMemoryAdapter.exists('file-1')).toBe(false);
  });

  it('returns true when file exists', async () => {
    await inMemoryAdapter.write('file-1', Buffer.from('content'));
    expect(await inMemoryAdapter.exists('file-1')).toBe(true);
  });

  it('removes a file', async () => {
    await inMemoryAdapter.write('file-1', Buffer.from('content'));
    await inMemoryAdapter.remove('file-1');

    expect(await inMemoryAdapter.exists('file-1')).toBe(false);
  });

  it('writes a file', async () => {
    await inMemoryAdapter.write('file-1', Buffer.from('content'));

    expect(await inMemoryAdapter.exists('file-1')).toBe(true);
  });

  it('creates a readstream when the file exists ', async () => {
    await inMemoryAdapter.write('file-1', Buffer.from('content'));

    expect(await inMemoryAdapter.createReadStream('file-1')).toBeInstanceOf(
      Readable,
    );
  });

  it('createReadStream throws an error when the file does exists ', async () => {
    await expect(() => inMemoryAdapter.createReadStream('file-1')).rejects.toBe(
      'File does not exist',
    );
  });

  it('handles the correct adapter', async () => {
    expect(inMemoryAdapter.handles('in-memory')).toBe(true);
  });
});
