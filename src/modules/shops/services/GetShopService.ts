import { inject, injectable } from 'tsyringe';

import { IHttpClientProvider } from '@shared/providers/HttpClientProvider/models/IHttpClientProvider';
import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';
import { Shop } from '../models/Shop';

interface Request {
  shopId: string;
}

@injectable()
class GetShopService {
  constructor(
    @inject('HttpClientProvider')
    private httpClientprovider: IHttpClientProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ shopId }: Request): Promise<Shop> {
    let shop = await this.cacheProvider.get<Shop>(`shop:${shopId}`);

    if (!shop) {
      console.log('Calling Yelp API');

      shop = await this.httpClientprovider.get<Shop>({
        url: `${process.env.YELP_URI}/businesses/${shopId}`,
        token: process.env.YELP_APP_KEY,
      });

      await this.cacheProvider.set(`shop:${shopId}`, shop);
      await this.cacheProvider.expiresIn(`shop:${shopId}`, 3600); // expires in 1 hour
    }

    return shop;
  }
}

export default GetShopService;
