import { inject, injectable } from 'tsyringe';

import { IHttpClientProvider } from '@shared/providers/HttpClientProvider/models/IHttpClientProvider';

interface Request {
  shopId: string;
}

@injectable()
class GetShopService {
  constructor(
    @inject('HttpClientProvider')
    private httpClientprovider: IHttpClientProvider,
  ) {}

  public async execute({ shopId }: Request): Promise<[]> {
    const shop = await this.httpClientprovider.get<[]>({
      url: `${process.env.YELP_URI}/businesses/${shopId}`,
      token: process.env.YELP_APP_KEY,
    });

    return shop;
  }
}

export default GetShopService;
