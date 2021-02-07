import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListShopsService from '@modules/shops/services/ListShopsService';
import GetShopService from '@modules/shops/services/GetShopService';

export default class ShopsController {
  async index(request: Request, response: Response): Promise<Response> {
    const { location } = request.query;

    const listIceCreamShops = container.resolve(ListShopsService);

    const shops = await listIceCreamShops.execute({
      location: String(location),
    });

    return response.json(shops);
  }

  async get(request: Request, response: Response): Promise<Response> {
    const { id: shopId } = request.params;

    const iceCreamShop = container.resolve(GetShopService);

    const shop = await iceCreamShop.execute({
      shopId,
    });

    return response.json(shop);
  }
}
