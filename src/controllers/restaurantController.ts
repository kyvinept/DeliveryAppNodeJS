import {RouterContext} from '@koa/router';
import ImageController from 'controllers/imageController';
import Koa from 'koa';
import ImageService from 'services/imageService';
import RestaurantService from 'services/restaurantService';
import {singleton} from 'tsyringe';

@singleton()
class RestaurantController {
  constructor(
    private imageController: ImageController,
    private restaurantService: RestaurantService,
    private imageService: ImageService,
  ) {}

  create = async (ctx: RouterContext, next: Koa.Next) => {
    const {name, description, images, location} = ctx.request.body;
    const ownerId = ctx.user.id;
    const data = await this.restaurantService.create({
      ownerId,
      name,
      description,
      images,
      location,
    });

    ctx.status = 201;
    ctx.body = {data};
  };

  update = async (ctx: RouterContext, next: Koa.Next) => {
    const {id} = ctx.params;
    const idInt = parseInt(id);
    const currentUserId = ctx.user.id;
    const {name, description, images, location} = ctx.request.body;

    const data = await this.restaurantService.update(
      {
        id: idInt,
        name,
        description,
        images,
        location,
      },
      currentUserId,
    );

    ctx.body = {data};
  };

  getAll = async (ctx: RouterContext, next: Koa.Next) => {
    const {page, per_page} = ctx.query;
    const pageInt = parseInt(page as string);
    const perPageInt = parseInt(per_page as string);

    const restaurantsModel = await this.restaurantService.getAll(
      pageInt,
      perPageInt,
    );

    ctx.body = {
      data: restaurantsModel.restaurants,
      metadata: {
        page: pageInt,
        per_page: perPageInt,
        total_page: Math.ceil(restaurantsModel.totalPage),
      },
    };
  };

  getOne = async (ctx: RouterContext, next: Koa.Next) => {
    const {id} = ctx.params;
    const idInt = parseInt(id);
    const data = await this.restaurantService.getOne(idInt);
    ctx.body = {data};
  };

  delete = async (ctx: RouterContext, next: Koa.Next) => {
    const {id} = ctx.params;
    const idInt = parseInt(id);
    const currentUserId = ctx.user.id;
    await this.restaurantService.delete(idInt, currentUserId);
    ctx.body = {};
  };

  uploadImage = async (ctx: RouterContext, next: Koa.Next) => {
    await this.imageController.save(ctx, next);
  };
}

export default RestaurantController;
