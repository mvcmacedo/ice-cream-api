import { inject, injectable } from 'tsyringe';

import { IHttpClientProvider } from '@shared/providers/HttpClientProvider/models/IHttpClientProvider';
import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';

import ShopItem from '../models/ShopItem';

interface Request {
  location: string;
}

interface ShopsList {
  businesses: ShopItem[];
}

@injectable()
class ListShopsService {
  constructor(
    @inject('HttpClientProvider')
    private httpClientprovider: IHttpClientProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ location }: Request): Promise<ShopItem[]> {
    let shops = await this.cacheProvider.get<ShopsList>(`shops:${location}`);

    if (!shops) {
      console.log('Calling Yelp API');

      shops = await this.httpClientprovider.get<ShopsList>({
        url: `${process.env.YELP_URI}/businesses/search?location=${location}&categories=icecream&sort_by=rating`,
        token: process.env.YELP_APP_KEY,
      });

      await this.cacheProvider.set(`shops:${location}`, shops);
      await this.cacheProvider.expiresIn(`shops:${location}`, 600); // expires in 10 minutes
    }

    return shops.businesses;
  }
}

export default ListShopsService;
