import { Router } from 'express';

import authenticateRouter from './authenticate.routes';
import carsRouter from './cars.routes';
import categoriesRouter from './categories.routes';
import passwordRouter from './password.routes';
import rentalsRouter from './rentals.routes';
import specificationsRouter from './specifications.routes';
import usersRouter from './users.routes';

const router = Router();

router.use('/categories', categoriesRouter);
router.use('/specifications', specificationsRouter);
router.use('/users', usersRouter);
router.use('/cars', carsRouter);
router.use('/rentals', rentalsRouter);
router.use('/password', passwordRouter);
router.use(authenticateRouter);

export default router;
