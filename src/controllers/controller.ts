import { RouterContext } from "@koa/router";
import { validationResults } from "koa-req-validation";
import ApiError from "errors/ApiError";
import strings from "strings";

class Controller {
  validate = async (ctx: RouterContext, callback: () => Promise<void>) => {
    try {
      const result = validationResults(ctx);
      if (result.hasErrors()) {
        throw ApiError.unprocessableEntity(
          strings.common.validationError,
          result.mapped()
        );
      }

      await callback();
    } catch (e) {
      ctx.throw(e);
    }
  };
}

export default Controller;
