import { Router } from 'express';
import multer from 'multer';

import CreateCategoryController from '@modules/cars/services/createCategory/CreateCategoryController';
import ImportCategoryController from '@modules/cars/services/importCategory/ImportCategoryController';
import ListCategoriesController from '@modules/cars/services/listCategories/ListCategoriesController';

import ensureAdmin from '../middlewares/ensureAdmin';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const categoriesRouter = Router();

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle,
);

categoriesRouter.get('/', listCategoriesController.handle);

categoriesRouter.post(
  '/import',
  ensureAuthenticated,
  ensureAdmin,
  upload.single('file'),
  importCategoryController.handle,
);

export default categoriesRouter;
