import 'reflect-metadata';
import nock from 'nock';

import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider';
import HttpClientProvider from '@shared/providers/HttpClientProvider/implementations/AxiosHttpClientProvider';

import AppError from '@shared/errors/AppError';
import GetShopService from './GetShopService';

describe('GetShop', () => {
  const fakeCacheProvider = new FakeCacheProvider();
  const httpClientProvider = new HttpClientProvider(); // using nock library instead a fake implementation

  const shopId = '1';
  const yelpUrl = 'https://test.com.br';

  beforeAll(() => {
    process.env.YELP_URI = yelpUrl;
    process.env.YELP_APP_KEY = 'test';
  });

  afterEach(async () => {
    nock.cleanAll();
    await fakeCacheProvider.invalidateAll();
  });

  it('should get a shop (calling from yelp api)', async () => {
    const getShop = new GetShopService(httpClientProvider, fakeCacheProvider);

    const fakeResponse = {
      id: 'test',
      name: 'test name',
    };

    nock(yelpUrl).get(`/businesses/${shopId}`).reply(200, fakeResponse);

    const shop = await getShop.execute({ shopId });

    expect(shop).toBeDefined();
    expect(shop.id).toBe('test');
    expect(shop.name).toBe('test name');
  });

  it('should get a shop (calling from cache)', async () => {
    const getShop = new GetShopService(httpClientProvider, fakeCacheProvider);

    const fakeResponse = {
      id: 'test',
      name: 'test name',
    };

    nock(yelpUrl).get(`/businesses/${shopId}`).once().reply(200, fakeResponse);

    await getShop.execute({ shopId });
    const shop = await getShop.execute({ shopId });

    expect(shop).toBeDefined();
    expect(shop.id).toBe('test');
    expect(shop.name).toBe('test name');
  });

  it('should NOT get shop (yelp api error)', async () => {
    const message = 'test error';
    const getShop = new GetShopService(httpClientProvider, fakeCacheProvider);

    nock(yelpUrl).get(`/businesses/${shopId}`).replyWithError({
      message,
    });

    const shop = getShop.execute({ shopId });

    expect(shop).rejects.toBeInstanceOf(AppError);
    expect(shop).rejects.toHaveProperty('message', message);
  });
});
