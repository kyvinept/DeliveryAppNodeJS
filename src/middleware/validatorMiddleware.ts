import ApiError from 'errors/ApiError';
import Joi from 'joi';
import Koa from 'koa';
import strings from 'strings';

export enum ValidationType {
  body,
  query,
}

export default (type: ValidationType, object: Object) => {
  return async (ctx: Koa.Context, next: Koa.Next) => {
    const joiObject = Joi.object(object);

    try {
      const result = await joiObject.validateAsync(
        type === ValidationType.body ? ctx.request.body : ctx.query,
        {abortEarly: false},
      );

      if (type === ValidationType.query) {
        ctx.query = result;
      }
    } catch (e) {
      ctx.throw(
        ApiError.unprocessableEntity(strings.common.validationError, e.details),
      );
    }

    await next();
  };
};
