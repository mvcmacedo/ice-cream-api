import { inject, injectable } from 'tsyringe';

import { IHttpClientProvider } from '@shared/providers/HttpClientProvider/models/IHttpClientProvider';

interface Request {
  location: string;
}

@injectable()
class ListShopsService {
  constructor(
    @inject('HttpClientProvider')
    private httpClientprovider: IHttpClientProvider,
  ) {}

  public async execute({ location }: Request): Promise<[]> {
    const shops = await this.httpClientprovider.get<[]>({
      url: `${process.env.YELP_URI}/businesses/search?location=${location}&categories=icecream&sort_by=rating`,
      token: process.env.YELP_APP_KEY,
    });

    return shops;
  }
}

export default ListShopsService;
