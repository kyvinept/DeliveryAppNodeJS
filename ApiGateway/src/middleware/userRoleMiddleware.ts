import {RouterContext} from '@koa/router';
import {UserRole} from '../models/user';
import Koa from 'koa';
import ApiError from '../errors/ApiError';

export const userRoleMiddleware = (userRole?: UserRole) => {
  return async (ctx: RouterContext, next: Koa.Next) => {
    if (!userRole) {
      return await next();
    }

    const user = ctx.user as any;
    if (user && user.role == userRole) {
      return await next();
    }

    ctx.throw(ApiError.forbidden());
  };
};
