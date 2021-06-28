import { inject, injectable } from 'tsyringe';

import ICarsImagesRepository from '@modules/cars/repositories/ICarsImagesRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/IStorageProvider';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesService {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const carImages = await this.carsImagesRepository.findCarImages(car_id);

    if (carImages.length > 0) {
      carImages.forEach(image =>
        this.storageProvider.delete(image.image_name, 'cars'),
      );
    }

    images_name.map(async image => {
      await this.carsImagesRepository.create(car_id, image);

      await this.storageProvider.save(image, 'cars');
    });
  }
}

export default UploadCarImagesService;
