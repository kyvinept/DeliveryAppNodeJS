import {RouterContext} from '@koa/router';
import {getServerHost} from 'helpers/getServerHost';
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

  save = async (ctx: RouterContext, next: Koa.Next, imageType: ImageType) => {
    const url = await this.imageService.save(ctx.request.file, imageType);

    ctx.body = {
      data: {
        url: getServerHost(ctx) + url,
      },
    };
  };
}

export default UserController;
