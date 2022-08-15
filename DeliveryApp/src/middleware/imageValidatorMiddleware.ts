import ApiError from 'errors/ApiError';
import Koa from 'koa';
import strings from 'strings';
import {container} from 'tsyringe';
import {RouterContext} from '@koa/router';

export default async (ctx: RouterContext, next: Koa.Next) => {
  const imageUrls = ctx.request.body.images;
  if (!imageUrls) {
    return await next();
  }

  // if (await imageServiceInstance.checkIfImagesExist(imageUrls)) {
  //   return await next();
  // }

  throw ApiError.unprocessableEntity(strings.image.imageHasNotBeenUploaded);
};
