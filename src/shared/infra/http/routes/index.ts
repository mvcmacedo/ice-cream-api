import { Router } from 'express';

const routes = Router();

routes.use('/', (req, res) => res.send({ message: 'Hello World' }));

export default routes;
