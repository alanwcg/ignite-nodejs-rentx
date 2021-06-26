import { Router } from 'express';
import multer from 'multer';

import upload from '@config/upload';
import CreateCarController from '@modules/cars/services/createCar/CreateCarController';
import CreateCarSpecificationController from '@modules/cars/services/createCarSpecification/CreateCarSpecificationController';
import ListAvailableCarsController from '@modules/cars/services/listAvailableCars/ListAvailableCarsController';
import UploadCarImagesController from '@modules/cars/services/uploadCarImages/UploadCarImagesController';

import ensureAdmin from '../middlewares/ensureAdmin';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const carsRouter = Router();

const uploadCarImages = multer(upload('./tmp/cars'));

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

carsRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carsRouter.get('/available', listAvailableCarsController.handle);

carsRouter.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle,
);

carsRouter.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImages.array('images'),
  uploadCarImagesController.handle,
);

export default carsRouter;
