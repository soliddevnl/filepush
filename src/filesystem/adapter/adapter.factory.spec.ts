import { AdapterFactory } from './adapter.factory';
import { AppConfigServiceTest } from '../../app-config/app-config.service.test';
import { InMemoryAdapter } from './in-memory.adapter';

describe('AdapterFactory', () => {
  let adapterFactory: AdapterFactory;
  const appConfigService: AppConfigServiceTest = new AppConfigServiceTest();

  beforeEach(async () => {
    adapterFactory = new AdapterFactory(appConfigService, [
      new InMemoryAdapter(),
    ]);
  });

  it('Throws error when adapter not found', () => {
    appConfigService.setFilesystem('local');

    expect(() => adapterFactory.create()).toThrowError(
      'Could not create adapter for "local"',
    );
  });

  it('Return correct adapter', () => {
    appConfigService.setFilesystem('in-memory');

    expect(adapterFactory.create()).toBeInstanceOf(InMemoryAdapter);
  });
});
