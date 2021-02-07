import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListShopReviews from '@modules/shops/services/ListShopReviewsService';

export default class ShopsController {
  async index(request: Request, response: Response): Promise<Response> {
    const { id: shopId } = request.params;

    const shopReviews = container.resolve(ListShopReviews);

    const reviews = await shopReviews.execute({
      shopId,
    });

    return response.json(reviews);
  }
}
