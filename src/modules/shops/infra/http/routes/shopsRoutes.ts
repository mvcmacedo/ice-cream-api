import { Router } from 'express';

import ShopsController from '../controllers/ShopsController';
import ShopReviewsController from '../controllers/ShopReviewsController';

const shopsRoute = Router();

const shopsController = new ShopsController();
const shopReviewsController = new ShopReviewsController();

shopsRoute.get('/', shopsController.index);
shopsRoute.get('/:id', shopsController.get);
shopsRoute.delete('/', shopsController.delete);
shopsRoute.get('/:id/reviews', shopReviewsController.index);

export default shopsRoute;
