import ApiError from 'errors/ApiError';
import Koa from 'koa';
import strings from 'strings';
import {container} from 'tsyringe';
import ImageService from 'services/imageService';
import {ImageType} from 'models/imageType';

export default (imageType: ImageType) => {
  return async (ctx: Koa.Context, next: Koa.Next) => {
    const imageServiceInstance = container.resolve(ImageService);
    const imageUrls = ctx.request.body.images;
    if (!imageUrls) {
      return await next();
    }

    if (await imageServiceInstance.checkIfImagesExist(imageUrls, imageType)) {
      return await next();
    }

    throw ApiError.unprocessableEntity(strings.image.imageHasNotBeenUploaded);
  };
};
