import { Router } from 'express';

import adminRoutes from './adminRoutes';
import publicRoutes from './publicRoutes';

const routes = Router();

routes.use(publicRoutes);
routes.use('/admin', adminRoutes);

export default routes;
