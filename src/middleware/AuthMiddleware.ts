import {RouterContext} from '@koa/router';
import jwt from 'jsonwebtoken';
import Koa from 'koa';
import ApiError from 'errors/ApiError';

export default async (ctx: RouterContext, next: Koa.Next) => {
  try {
    const token = ctx.request.headers.authorization.split(' ')[1];
    if (!token) {
      ctx.throw(ApiError.unauthorized());
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    ctx.user = decoded;
    await next();
  } catch (e) {
    ctx.throw(ApiError.unauthorized());
  }
};
