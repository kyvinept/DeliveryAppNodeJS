import {RouterContext} from '@koa/router';
import Koa from 'koa';
import {singleton} from 'tsyringe';
import OrderService from 'services/orderService';
import BaseController from './baseController';

@singleton()
class OrderController extends BaseController {
  constructor(private orderService: OrderService) {
    super();
  }

  create = async (ctx: RouterContext, next: Koa.Next) => {
    const {name, comment, dish_ids, address, delivery_time} = ctx.request.body;
    const {id} = ctx.params;
    const idInt = parseInt(id);
    const userId = ctx.user.id;
    const data = await this.orderService.create({
      restaurantId: idInt,
      name,
      comment,
      dishIds: dish_ids,
      address,
      deliveryTime: delivery_time,
      userId,
    });

    ctx.status = 201;
    ctx.body = {data};
  };

  delete = async (ctx: RouterContext, next: Koa.Next) => {
    const {id} = ctx.params;
    const idInt = parseInt(id);
    await this.orderService.delete(idInt);
    ctx.body = {};
  };

  getAllForUser = async (ctx: RouterContext, next: Koa.Next) => {
    const {page, per_page} = ctx.query;
    const pageInt = parseInt(page as string);
    const perPageInt = parseInt(per_page as string);
    const userId = ctx.user.id;

    const data = await this.orderService.getAllForUser(
      userId,
      pageInt,
      perPageInt,
    );

    ctx.body = this.paginationBody({
      data,
      page: pageInt,
      perPage: perPageInt,
    });
  };
}

export default OrderController;
