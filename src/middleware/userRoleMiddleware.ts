import Koa from 'koa';
import ApiError from 'errors/ApiError';
import {IUser, UserRole} from 'models/database/user';

export default (userRole: UserRole) => {
  return async (ctx: Koa.Context, next: Koa.Next) => {
    const user = ctx.user as IUser;
    if (user && user.role == userRole) {
      return await next();
    }

    ctx.throw(ApiError.forbidden());
  };
};
