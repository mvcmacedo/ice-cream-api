import { Router } from 'express';

import shopsRoutes from '@modules/shops/infra/http/routes/shopsRoutes';

const routes = Router();

routes.use('/shops', shopsRoutes);

export default routes;
