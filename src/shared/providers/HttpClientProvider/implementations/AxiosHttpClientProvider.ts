import AppError from '@shared/errors/AppError';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import {
  IHttpClientProvider,
  IHttpClientRequestParams,
} from '../models/IHttpClientProvider';

export default class AxiosHttpClient implements IHttpClientProvider {
  public async get<T>(parameters: IHttpClientRequestParams): Promise<T> {
    const { url, token } = parameters;
    let options: AxiosRequestConfig = {};

    if (token) {
      options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }

    return axios
      .get(url, options)
      .then((response: AxiosResponse) => {
        return response.data as T;
      })
      .catch((response: AxiosError) => {
        throw new AppError(response.message);
      });
  }
}
