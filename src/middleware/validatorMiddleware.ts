import ApiError from 'errors/ApiError';
import Joi from 'joi';
import Koa from 'koa';
import strings from 'strings';

export enum ValidationType {
  body,
  query,
  link,
}

export default (type: ValidationType, object: Object) => {
  return async (ctx: Koa.Context, next: Koa.Next) => {
    const joiObject = Joi.object(object);

    let params = {};
    switch (type) {
      case ValidationType.body:
        params = ctx.request.body;
        break;
      case ValidationType.link:
        params = ctx.params;
        break;
      case ValidationType.query:
        params = ctx.query;
        break;
    }

    try {
      const result = await joiObject.validateAsync(params, {
        abortEarly: false,
      });

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
