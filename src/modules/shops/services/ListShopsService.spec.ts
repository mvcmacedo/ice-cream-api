import 'reflect-metadata';
import nock from 'nock';

import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider';
import HttpClientProvider from '@shared/providers/HttpClientProvider/implementations/AxiosHttpClientProvider';

import AppError from '@shared/errors/AppError';
import ListShopsService from './ListShopsService';

describe('ListShops', () => {
  const fakeCacheProvider = new FakeCacheProvider();
  const httpClientProvider = new HttpClientProvider(); // using nock library instead a fake implementation

  const location = 'Test';
  const yelpUrl = 'https://test.com.br';

  beforeAll(() => {
    process.env.YELP_URI = yelpUrl;
    process.env.YELP_APP_KEY = 'test';
  });

  afterEach(async () => {
    nock.cleanAll();
    await fakeCacheProvider.invalidateAll();
  });

  it('should list shops (calling from yelp api)', async () => {
    const getShop = new ListShopsService(httpClientProvider, fakeCacheProvider);

    const fakeResponse = {
      businesses: [
        {
          id: 'test',
          name: 'test name',
        },
      ],
    };

    nock(yelpUrl)
      .get(
        `/businesses/search?location=${location}&categories=icecream&sort_by=rating`,
      )
      .reply(200, fakeResponse);

    const shops = await getShop.execute({ location });

    expect(shops).toBeInstanceOf(Array);
    expect(shops).toHaveLength(1);
  });

  it('should list shops (calling from cache)', async () => {
    const getShop = new ListShopsService(httpClientProvider, fakeCacheProvider);

    const fakeResponse = {
      businesses: [
        {
          id: 'test',
          name: 'test name',
        },
      ],
    };

    nock(yelpUrl)
      .get(
        `/businesses/search?location=${location}&categories=icecream&sort_by=rating`,
      )
      .once()
      .reply(200, fakeResponse);

    await getShop.execute({ location });
    const shops = await getShop.execute({ location });

    expect(shops).toBeInstanceOf(Array);
    expect(shops).toHaveLength(1);
  });

  it('should NOT list shops (yelp api error)', async () => {
    const message = 'test error';
    const getShop = new ListShopsService(httpClientProvider, fakeCacheProvider);

    nock(yelpUrl)
      .get(
        `/businesses/search?location=${location}&categories=icecream&sort_by=rating`,
      )
      .replyWithError({
        message,
      });

    const shop = getShop.execute({ location });

    expect(shop).rejects.toBeInstanceOf(AppError);
    expect(shop).rejects.toHaveProperty('message', message);
  });
});
