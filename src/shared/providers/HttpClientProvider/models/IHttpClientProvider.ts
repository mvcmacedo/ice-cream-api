export interface IHttpClientRequestParams {
  url: string;
  token?: string;
}

export interface IHttpClientProvider {
  get<T>(params: IHttpClientRequestParams): Promise<T>;
}
