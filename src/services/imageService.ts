import ApiError from 'errors/ApiError';
import strings from 'strings';
import {injectable} from 'tsyringe';
import ImageRepository from 'repositories/imageRepository';
import minio from 'configs/minio';
import {v4} from 'uuid';
import multer from '@koa/multer';
import {ImageType} from 'models/imageType';

@injectable()
class ImageService {
  constructor(private imageRepository: ImageRepository) {}

  save = async (file: multer.File, type: ImageType) => {
    file.filename = this.configureNameFromMimetype(file.mimetype);
    await this.saveToBucket(
      file.filename,
      file.size,
      file.buffer,
      file.mimetype,
    );
    await this.imageRepository.create({original: file.filename, type});
    return file.filename;
  };

  replaceImages = async (oldLinks: string[], newLinks: string[]) => {
    const linksToRemove = oldLinks.filter((item) => !newLinks.includes(item));

    for (let index = 0; index < linksToRemove.length; index++) {
      await this.delete(linksToRemove[index]);
    }
  };

  delete = async (name: string) => {
    const image = await this.imageRepository.findOneByCondition({
      original: name,
    });

    if (image) {
      console.log('Image was found and deleted');

      await this.deleteFromBucket(name);
      await this.imageRepository.delete(image);
    }
  };

  getUrl = async (name: string) => {
    const url = await minio.presignedGetObject(process.env.BUCKET_NAME, name);
    return url;
  };

  private configureNameFromMimetype = (mimetype: string) => {
    const type = mimetype.split('/')[1];
    return v4() + '_original.' + type;
  };

  private saveToBucket = async (
    fileName: string,
    fileSize: number,
    fileBuffer: Buffer,
    contentType: string,
  ) => {
    const metadata = {
      'Content-type': contentType,
    };

    await minio.putObject(
      process.env.BUCKET_NAME,
      fileName,
      fileBuffer,
      fileSize,
      metadata,
    );
  };

  private deleteFromBucket = async (name: string) => {
    return await minio.removeObject(process.env.BUCKET_NAME, name);
  };
}

export default ImageService;
