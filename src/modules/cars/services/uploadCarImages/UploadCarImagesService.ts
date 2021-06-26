import { inject, injectable } from 'tsyringe';

import ICarsImagesRepository from '@modules/cars/repositories/ICarsImagesRepository';
import deleteFile from '@utils/file';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesService {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const carImages = await this.carsImagesRepository.findCarImages(car_id);

    if (carImages.length > 0) {
      carImages.forEach(image => deleteFile(`./tmp/cars/${image.image_name}`));
    }

    images_name.map(async image => {
      await this.carsImagesRepository.create(car_id, image);
    });
  }
}

export default UploadCarImagesService;
