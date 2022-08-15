import Router, {RouterContext} from '@koa/router';
import Koa from 'koa';
import mediaServiceConfig from './mediaService';
import proxy from 'koa-proxies';
import {authMiddleware} from '../middleware/authMiddleware';
import {userRoleMiddleware} from '../middleware/userRoleMiddleware';
import {RouteModel} from './ConfigModel';
import userServiceConfig from './userService';
import deliveryAppConfig from './deliveryApp';

const router = new Router();

const configs = [mediaServiceConfig, userServiceConfig, deliveryAppConfig];

const proxyMiddleware = (baseUrl: string, item: RouteModel) => {
  return async (ctx: RouterContext, next: Koa.Next) => {
    return proxy(item.route, {
      target: baseUrl,
      logs: true,
    })(ctx, next);
  };
};

configs.forEach((config) => {
  config.routes.forEach((item) => {
    switch (item.http) {
      case 'GET':
        router.get(
          item.route,
          authMiddleware(item),
          userRoleMiddleware(item.role),
          proxyMiddleware(config.baseUrl, item),
        );
        break;

      case 'POST':
        router.post(
          item.route,
          authMiddleware(item),
          userRoleMiddleware(item.role),
          proxyMiddleware(config.baseUrl, item),
        );
        break;

      case 'PATCH':
        router.patch(
          item.route,
          authMiddleware(item),
          userRoleMiddleware(item.role),
          proxyMiddleware(config.baseUrl, item),
        );
        break;

      case 'DELETE':
        router.delete(
          item.route,
          authMiddleware(item),
          userRoleMiddleware(item.role),
          proxyMiddleware(config.baseUrl, item),
        );
        break;

      default:
        break;
    }
  });
});

export default router;
