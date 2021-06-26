import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import ListAvailableCarsService from './ListAvailableCarsService';

let listAvailableCarsService: ListAvailableCarsService;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsService = new ListAvailableCarsService(
      carsRepositoryInMemory,
    );
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car1',
      description: 'car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'car brand',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsService.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car name test',
      description: 'car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'car brand',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsService.execute({
      name: 'car name test',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car2',
      description: 'car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'car brand test',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsService.execute({
      brand: 'car brand test',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car3',
      description: 'car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'car brand',
      category_id: 'category_id test',
    });

    const cars = await listAvailableCarsService.execute({
      category_id: 'category_id test',
    });

    expect(cars).toEqual([car]);
  });
});
