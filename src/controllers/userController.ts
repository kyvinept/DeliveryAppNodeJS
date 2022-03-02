import {RouterContext} from '@koa/router';
import Koa from 'koa';
import UserService from 'services/userService';
import {singleton} from 'tsyringe';
import strings from 'strings';

@singleton()
class UserController {
  constructor(private userService: UserService) {}

  registration = async (ctx: RouterContext, next: Koa.Next) => {
    const {email, password, role} = ctx.request.body;
    const data = await this.userService.registration(email, password, role);

    ctx.status = 201;
    ctx.body = {data};
  };

  login = async (ctx: RouterContext, next: Koa.Next) => {
    const {email, password} = ctx.request.body;
    const data = await this.userService.login(email, password);
    ctx.body = {data};
  };

  logout = async (ctx: RouterContext, next: Koa.Next) => {
    const user = ctx.user;
    await this.userService.logout(user);
    ctx.body = {};
  };

  refresh = async (ctx: RouterContext, next: Koa.Next) => {
    const {userId, refreshToken} = ctx.request.body;
    const data = await this.userService.refresh(userId, refreshToken);
    ctx.body = {data};
  };

  forgetPassword = async (ctx: RouterContext, next: Koa.Next) => {
    const {email} = ctx.request.body;
    await this.userService.forgetPassword(email);
    ctx.body = {
      data: {
        message: strings.mail.emailHasBeenSent,
      },
    };
  };

  recoverPassword = async (ctx: RouterContext, next: Koa.Next) => {
    const {token, password} = ctx.request.body;
    await this.userService.recoverPassword(token, password);
    ctx.body = {};
  };
}

export default UserController;
