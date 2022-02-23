import {RouterContext} from '@koa/router';
import Koa from 'koa';
import {ImageType} from 'models/imageType';
import ImageService from 'services/imageService';
import {singleton} from 'tsyringe';

@singleton()
class UserController {
  constructor(private imageService: ImageService) {}

  getImage = async (ctx: RouterContext, next: Koa.Next) => {
    const name = ctx.params.name;
    ctx.redirect(await this.imageService.getUrl(name));
  };

  save = async (ctx: RouterContext, next: Koa.Next) => {
    const url = await this.imageService.save(
      ctx.request.file,
      ImageType.restaurant,
    );

    ctx.body = {
      data: {
        url: ctx.protocol + '://' + ctx.request.header.host + '/' + url,
      },
    };
  };
}

export default UserController;
