import { Readable } from 'stream';
import { LocalAdapter } from './local.adapter';
import * as fs from 'fs';
import { ReadStream } from 'fs';
import { AppConfigService } from '../../app-config/app-config.service';

jest.mock('fs');

describe('LocalAdapter', () => {
  let adapter: LocalAdapter;

  const AppConfigServiceMock: jest.Mock<AppConfigService> = jest.fn();
  const config = new AppConfigServiceMock();
  Object.defineProperty(config, 'fileDir', {
    get: jest.fn(() => '/files'),
  });

  beforeEach(async () => {
    adapter = new LocalAdapter(config);
  });

  it('returns false when file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    expect(await adapter.exists('file-1')).toBe(false);
  });

  it('returns true when file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);

    expect(await adapter.exists('file-1')).toBe(true);
  });

  it('removes a file', async () => {
    await adapter.remove('file-1');
    expect(jest.spyOn(fs, 'unlinkSync').mock.calls[0][0]).toBe('/files/file-1');
  });

  it('writes a file', async () => {
    jest.spyOn(fs, 'writeFileSync');
    await adapter.write('file-1', Buffer.from('content'));

    expect(jest.spyOn(fs, 'writeFileSync').mock.calls[0]).toEqual([
      '/files/file-1',
      Buffer.from('content'),
    ]);
  });

  it('creates a Readable Stream when the file exists ', async () => {
    jest
      .spyOn(fs, 'createReadStream')
      .mockReturnValue(<ReadStream>Readable.from('test'));

    expect(await adapter.createReadStream('file-1')).toBeInstanceOf(Readable);
  });

  it('createReadStream throws an error when the file does exists ', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    await expect(() => adapter.createReadStream('file-1')).rejects.toBe(
      'File does not exist',
    );
  });

  it('handles the correct adapter', async () => {
    expect(adapter.handles('local')).toBe(true);
  });
});
