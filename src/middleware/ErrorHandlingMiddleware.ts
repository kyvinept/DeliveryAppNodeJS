import ApiError from "../errors/ApiError";
import Koa from "koa";
import HttpStatus from "http-status-codes";

export default async (ctx: Koa.Context, next: Koa.Next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof ApiError) {
      ctx.status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      ctx.body = { message: error.message, errors: error.errors };
      return;
    }

    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = { message: "Unknown error!" };
  }
};
