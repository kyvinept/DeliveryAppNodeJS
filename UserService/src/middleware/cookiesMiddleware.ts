import {RouterContext} from '@koa/router';
import ApiError from 'errors/ApiError';
import Koa from 'koa';

export default async (ctx: RouterContext, next: Koa.Next) => {
  try {
    const jsonUser = ctx.cookies.get('user');
    console.log(jsonUser);

    if (!jsonUser) {
      throw ApiError.unauthorized();
    }

    const user = JSON.parse(jsonUser);
    if (!user) {
      throw ApiError.unauthorized();
    }

    ctx.user = user;
  } catch (e) {
    ctx.throw(e);
  }

  return await next();
};
