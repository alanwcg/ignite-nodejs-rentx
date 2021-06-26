import { Router } from 'express';

import ResetPasswordUserController from '@modules/accounts/services/resetPasswordUser/ResetPasswordUserController';
import SendForgotPasswordMailController from '@modules/accounts/services/sendForgotPasswordMail/SendForgotPasswordMailController';

const passwordRouter = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordUserController();

passwordRouter.post('/forgot', sendForgotPasswordMailController.handle);
passwordRouter.post('/reset', resetPasswordController.handle);

export default passwordRouter;
