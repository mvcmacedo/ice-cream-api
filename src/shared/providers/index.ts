import { container } from 'tsyringe';

import { IHttpClientProvider } from './HttpClientProvider/models/IHttpClientProvider';
import AxiosHttpClientProvider from './HttpClientProvider/implementations/AxiosHttpClientProvider';

container.registerSingleton<IHttpClientProvider>(
  'HttpClientProvider',
  AxiosHttpClientProvider,
);
