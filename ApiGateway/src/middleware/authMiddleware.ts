import {RouteModel} from '../proxies/ConfigModel';
import Koa from 'koa';
import {RouterContext} from '@koa/router';
import Queue from '../queues';
import ApiError from '../errors/ApiError';

export const authMiddleware = (item: RouteModel) => {
  return async (ctx: RouterContext, next: Koa.Next) => {
    if (item.authRequired) {
      const user = await Queue.checkToken(ctx.request.headers.authorization);
      if (!user) {
        throw ApiError.unauthorized();
      }

      ctx.cookies.set('user', JSON.stringify(user), {
        secure: process.env.NODE_ENV === 'testing' ? true : false,
      });
    }

    await next();
  };
};
