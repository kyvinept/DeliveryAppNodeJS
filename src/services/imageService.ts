import ApiError from 'errors/ApiError';
import strings from 'strings';
import {injectable} from 'tsyringe';
import ImageRepository from 'repositories/imageRepository';

@injectable()
class ImageService {
  constructor(private imageRepository: ImageRepository) {}
}

export default ImageService;
