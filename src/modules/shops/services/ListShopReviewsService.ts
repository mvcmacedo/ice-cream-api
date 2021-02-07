import { inject, injectable } from 'tsyringe';

import { IHttpClientProvider } from '@shared/providers/HttpClientProvider/models/IHttpClientProvider';
import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';

import { Review } from '../models/Review';

interface Request {
  shopId: string;
}

interface ReviewsList {
  reviews: Review[];
  total: number;
  possible_languages: string;
}

@injectable()
class ListShopReviewService {
  constructor(
    @inject('HttpClientProvider')
    private httpClientprovider: IHttpClientProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ shopId }: Request): Promise<Review[]> {
    let shopReviews = await this.cacheProvider.get<ReviewsList>(
      `reviews:${shopId}`,
    );

    if (!shopReviews) {
      console.log('Calling Yelp API');

      shopReviews = await this.httpClientprovider.get<ReviewsList>({
        url: `${process.env.YELP_URI}/businesses/${shopId}/reviews`,
        token: process.env.YELP_APP_KEY,
      });

      await this.cacheProvider.set(`reviews:${shopId}`, shopReviews);
      await this.cacheProvider.expiresIn(`reviews:${shopId}`, 7200); // expires in 2 hours
    }

    return shopReviews.reviews;
  }
}

export default ListShopReviewService;
