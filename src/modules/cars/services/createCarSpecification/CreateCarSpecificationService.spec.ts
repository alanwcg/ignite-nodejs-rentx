import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import SpecificationsRepositoryInMemory from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import CreateCarSpecificationService from './CreateCarSpecificationService';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createCarSPecificationService: CreateCarSpecificationService;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSPecificationService = new CreateCarSpecificationService(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    );
  });

  it('should be able to add a new specification to a car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car name',
      description: 'car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'car brand',
      category_id: 'category',
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: 'test',
      description: 'test',
    });

    const specifications_ids = [specification.id];

    const specificationsCars = await createCarSPecificationService.execute({
      car_id: car.id,
      specifications_ids,
    });

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });

  it('should not be able to add a new specification to a nonexistent car', async () => {
    const car_id = '1234';
    const specifications_ids = ['54321'];

    await expect(
      createCarSPecificationService.execute({
        car_id,
        specifications_ids,
      }),
    ).rejects.toEqual(new AppError('Car does not exists!'));
  });
});
