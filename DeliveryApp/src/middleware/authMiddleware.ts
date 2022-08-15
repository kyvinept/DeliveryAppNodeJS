import {RouterContext} from '@koa/router';
import Koa from 'koa';
import ApiError from 'errors/ApiError';

export default async (ctx: RouterContext, next: Koa.Next) => {
  try {
    const jsonUser = ctx.request.header['user'] as string;
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
