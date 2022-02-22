import {RouterContext} from '@koa/router';
import Koa from 'koa';
import ApiError from 'errors/ApiError';
import {IUser, UserRole} from 'models/database/user';

export default async (ctx: RouterContext, next: Koa.Next) => {
  const user = ctx.user as IUser;
  if (user && user.role === UserRole.serviceProvider) {
    return await next();
  }

  ctx.throw(ApiError.unauthorized());
};
