import { Router } from 'express';
import multer from 'multer';

import upload from '@config/upload';
import CreateUserController from '@modules/accounts/services/createUser/CreateUserController';
import UpdateUserAvatarController from '@modules/accounts/services/updateUserAvatar/UpdateUserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const uploadAvatar = multer(upload('./tmp/avatar'));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRouter.post('/', createUserController.handle);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
);

export default usersRouter;
