import { RouterContext } from "@koa/router";
import jwt from "jsonwebtoken";
import Koa from "koa";
import ApiError from "../errors/ApiError";
import HttpStatus from "http-status-codes";
import strings from "../strings";

export default async (ctx: RouterContext, next: Koa.Next) => {
  try {
    const token = ctx.request.headers.authorization.split(" ")[1];
    if (!token) {
      ctx.throw(
        new ApiError(HttpStatus.UNAUTHORIZED, strings.common.notAuthorized)
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    ctx.user = decoded;
    await next();
  } catch (e) {
    ctx.throw(
      new ApiError(HttpStatus.UNAUTHORIZED, strings.common.notAuthorized)
    );
  }
};
