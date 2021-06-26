import CategoriesRepositoryInMemory from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import CreateCategoryService from './CreateCategoryService';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryService: CreateCategoryService;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryService = new CreateCategoryService(
      categoriesRepositoryInMemory,
    );
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category Description Test',
    };

    await createCategoryService.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name,
    );

    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create a new category that already exists', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category Description Test',
    };

    await createCategoryService.execute({
      name: category.name,
      description: category.description,
    });

    await expect(
      createCategoryService.execute({
        name: category.name,
        description: category.description,
      }),
    ).rejects.toEqual(new AppError('Category already exists'));
  });
});
