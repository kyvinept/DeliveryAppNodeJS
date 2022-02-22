import {RouterContext} from '@koa/router';
import Koa from 'koa';
import RestaurantService from 'services/restaurantService';
import {singleton} from 'tsyringe';

@singleton()
class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  create = async (ctx: RouterContext, next: Koa.Next) => {
    const {name, description, images, location} = ctx.request.body;
    const data = await this.restaurantService.create({
      ownerId: ctx.user.id,
      name,
      description,
      images,
      location,
    });
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
}

export default RestaurantController;
