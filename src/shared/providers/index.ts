import { container } from 'tsyringe';

import { IHttpClientProvider } from './HttpClientProvider/models/IHttpClientProvider';
import AxiosHttpClientProvider from './HttpClientProvider/implementations/AxiosHttpClientProvider';

import ICacheProvider from './CacheProvider/models/ICacheProvider';
import RedisCacheProvider from './CacheProvider/implementations/RedisCacheProvider';

container.registerSingleton<IHttpClientProvider>(
  'HttpClientProvider',
  AxiosHttpClientProvider,
);

container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  RedisCacheProvider,
);
