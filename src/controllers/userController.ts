import { RouterContext } from "@koa/router";
import Koa from "koa";
import { UserService } from "services";
import Controller from "./controller";

class UserController extends Controller {
  private userService = new UserService();

  registration = async (ctx: RouterContext, next: Koa.Next) => {
    await this.validate(ctx, async () => {
      const { email, password } = ctx.request.body;
      const data = await this.userService.registration(email, password);

      ctx.status = 201;
      ctx.body = { data };
    });
  };

  login = async (ctx: RouterContext, next: Koa.Next) => {
    await this.validate(ctx, async () => {
      const { email, password } = ctx.request.body;
      const data = await this.userService.login(email, password);

      ctx.body = { data };
    });
  };

  logout = async (ctx: RouterContext, next: Koa.Next) => {
    await this.validate(ctx, async () => {
      const user = ctx.user;
      await this.userService.logout(user);
      ctx.body = {};
    });
  };
}

export default new UserController();
