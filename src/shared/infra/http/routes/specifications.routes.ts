import { Router } from 'express';

import CreateSpecificationController from '@modules/cars/services/createSpecification/CreateSpecificationController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import ensureAdmin from '../middlewares/ensureAdmin';

const specificationsRouter = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle,
);

export default specificationsRouter;
