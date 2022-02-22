import ApiError from 'errors/ApiError';
import Joi from 'joi';
import Koa from 'koa';
import strings from 'strings';

export default (object: Object) => {
  return async (ctx: Koa.Context, next: Koa.Next) => {
    const joiObject = Joi.object(object);

    try {
      await joiObject.validateAsync(ctx.request.body, {abortEarly: false});
    } catch (e) {
      ctx.throw(
        ApiError.unprocessableEntity(strings.common.validationError, e.details),
      );
    }

    await next();
  };
};
