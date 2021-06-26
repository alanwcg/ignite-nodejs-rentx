import { Router } from 'express';

import AuthenticateUserController from '@modules/accounts/services/authenticateUser/AuthenticateUserController';
import RefreshTokenController from '@modules/accounts/services/refreshToken/RefreshTokenController';

const authenticateRouter = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRouter.post('/sessions', authenticateUserController.handle);

authenticateRouter.post('/refresh-token', refreshTokenController.handle);

export default authenticateRouter;
