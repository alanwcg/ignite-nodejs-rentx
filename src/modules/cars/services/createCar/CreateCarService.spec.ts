import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import CreateCarService from './CreateCarService';

let createCarService: CreateCarService;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarService = new CreateCarService(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarService.execute({
      name: 'car name',
      description: 'car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'car brand',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with existent license plate', async () => {
    await createCarService.execute({
      name: 'car name',
      description: 'car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'car brand',
      category_id: 'category',
    });

    await expect(
      createCarService.execute({
        name: 'car2 name',
        description: 'car description',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'car brand',
        category_id: 'category',
      }),
    ).rejects.toEqual(new AppError('Car already exists!'));
  });

  it('should not be able to create a car with available true by default', async () => {
    const car = await createCarService.execute({
      name: 'car available',
      description: 'car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'car brand',
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});
