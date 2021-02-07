import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListShopsService from '@modules/shops/services/ListShopsService';
import GetShopService from '@modules/shops/services/GetShopService';
import InvalidateAllService from '@modules/shops/services/InvalidateAllService';

export default class ShopsController {
  async index(request: Request, response: Response): Promise<Response> {
    const { location } = request.query;

    const listIceCreamShops = container.resolve(ListShopsService);

    const shops = await listIceCreamShops.execute({
      location: String(location) || 'Alpharetta', // default city
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

  async delete(_: Request, response: Response): Promise<Response> {
    const invalidateAll = container.resolve(InvalidateAllService);

    await invalidateAll.execute();

    return response.send();
  }
}
