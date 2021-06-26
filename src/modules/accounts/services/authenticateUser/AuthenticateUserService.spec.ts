import ICreateUserDTO from '@modules/accounts/dtos/ICreateUserDTO';
import UsersRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import UsersTokensRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import IUsersTokensRepository from '@modules/accounts/repositories/IUsersTokensRepository';
import DayjsDateProvider from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import AppError from '@shared/errors/AppError';

import CreateUserService from '../createUser/CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: IUsersTokensRepository;
let dateProvider: DayjsDateProvider;
let createUserService: CreateUserService;
let authenticateUserService: AuthenticateUserService;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();

    createUserService = new CreateUserService(usersRepositoryInMemory);
    authenticateUserService = new AuthenticateUserService(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
    );
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      name: 'User',
      email: 'user@test.com',
      password: '123456',
      driver_license: '00123',
    };

    await createUserService.execute(user);

    const result = await authenticateUserService.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate an nonexistent user', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'user@test.com',
        password: '123456',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      name: 'User',
      email: 'user@test.com',
      password: '123456',
      driver_license: '00123',
    };

    await createUserService.execute(user);

    await expect(
      authenticateUserService.execute({
        email: user.email,
        password: 'incorrect password',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });
});
