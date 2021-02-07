import { inject, injectable } from 'tsyringe';

import { IHttpClientProvider } from '@shared/providers/HttpClientProvider/models/IHttpClientProvider';

interface Request {
  shopId: string;
}

@injectable()
class ListShopReviewService {
  constructor(
    @inject('HttpClientProvider')
    private httpClientprovider: IHttpClientProvider,
  ) {}

  public async execute({ shopId }: Request): Promise<[]> {
    const shopReviews = await this.httpClientprovider.get<[]>({
      url: `${process.env.YELP_URI}/businesses/${shopId}/reviews`,
      token: process.env.YELP_APP_KEY,
    });

    return shopReviews;
  }
}

export default ListShopReviewService;
