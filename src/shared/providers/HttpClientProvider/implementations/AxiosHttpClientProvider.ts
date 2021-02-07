import AppError from '@shared/errors/AppError';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import {
  IHttpClientProvider,
  IHttpClientRequestParams,
} from '../models/IHttpClientProvider';

export default class AxiosHttpClient implements IHttpClientProvider {
  public async get<T>(parameters: IHttpClientRequestParams): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const { url, token } = parameters;
      let options: AxiosRequestConfig = {};

      if (token) {
        options = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      }

      axios
        .get(url, options)
        .then((response: AxiosResponse) => {
          resolve(response.data as T);
        })
        .catch((response: AxiosResponse) => {
          reject(new AppError(`Failed to call Yelp API: ${response}`));
        });
    });
  }
}
