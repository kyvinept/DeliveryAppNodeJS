import {RouterContext} from '@koa/router';
import ApiError from 'errors/ApiError';
import Koa from 'koa';
import ImageService from 'services/imageService';
import {singleton} from 'tsyringe';
import strings from 'strings';

@singleton()
class UserController {
  constructor(private imageService: ImageService) {}

  getImage = async (ctx: RouterContext, next: Koa.Next) => {
    const name = ctx.params.name;
    ctx.redirect(await this.imageService.getUrl(name));
  };

  save = async (ctx: RouterContext, next: Koa.Next) => {
    if (!ctx.request.file) {
      throw ApiError.unprocessableEntity(strings.image.imageWasNotFoundInBody);
    }

    const filename = await this.imageService.save(ctx.request.file);

    ctx.status = 201;
    ctx.body = {
      data: {
        filename,
      },
    };
  };
}

export default UserController;
