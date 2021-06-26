import csvParse from 'csv-parse';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import ICreateCategoryDTO from '@modules/cars/dtos/ICreateCategoryDTO';
import ICategoriesRepository from '@modules/cars/repositories/ICategoriesRepository';

@injectable()
class ImportCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  loadCategorie(file: Express.Multer.File): Promise<ICreateCategoryDTO[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);

      const categories: ICreateCategoryDTO[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on('data', line => {
          const [name, description] = line;

          categories.push({ name, description });
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', err => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategorie(file);

    categories.map(async category => {
      const { name, description } = category;

      const existCategory = await this.categoriesRepository.findByName(name);

      if (!existCategory) {
        await this.categoriesRepository.create({ name, description });
      }
    });
  }
}

export default ImportCategoryService;
