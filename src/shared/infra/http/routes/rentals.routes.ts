import { Router } from 'express';

import CreateRentalController from '@modules/rentals/services/createRental/CreateRentalController';
import DevolutionRentalController from '@modules/rentals/services/devolutionRental/DevolutionRentalController';
import ListRentalsByUserController from '@modules/rentals/services/listRentalsByUser/ListRentalsByUserController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const rentalsRouter = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRouter.post('/', ensureAuthenticated, createRentalController.handle);

rentalsRouter.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle,
);

rentalsRouter.get(
  '/user',
  ensureAuthenticated,
  listRentalsByUserController.handle,
);

export default rentalsRouter;
