import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UserProfileService from './UserProfileService';

class UserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const userProfileService = container.resolve(UserProfileService);

    const user = await userProfileService.execute(id);

    return response.json(user);
  }
}

export default UserProfileController;
