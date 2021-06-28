import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import CreateUserController from '@modules/accounts/services/createUser/CreateUserController';
import UpdateUserAvatarController from '@modules/accounts/services/updateUserAvatar/UpdateUserAvatarController';
import UserProfileController from '@modules/accounts/services/userProfileService/UserProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const userProfileController = new UserProfileController();

usersRouter.post('/', createUserController.handle);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
);

usersRouter.get('/profile', ensureAuthenticated, userProfileController.handle);

export default usersRouter;
