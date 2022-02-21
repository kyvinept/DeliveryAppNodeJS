import { RouterContext } from "@koa/router";
import Koa from "koa";
import { UserService } from "services";
import { singleton } from "tsyringe";
import Controller from "./controller";

@singleton()
class UserController extends Controller {
  constructor(private userService: UserService) {
    super();
  }

  registration = async (ctx: RouterContext, next: Koa.Next) => {
    await this.validate(ctx, async () => {
      const { email, password, role } = ctx.request.body;
      const data = await this.userService.registration(email, password, role);

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

  refresh = async (ctx: RouterContext, next: Koa.Next) => {
    await this.validate(ctx, async () => {
      const { refreshToken } = ctx.request.body;
      const data = await this.userService.refresh(refreshToken);
      ctx.body = { data };
    });
  };
}

export default UserController;
