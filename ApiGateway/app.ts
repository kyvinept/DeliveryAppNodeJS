import Koa from 'koa';
import logger from 'koa-logger';
import json from 'koa-json';
import Router from '@koa/router';
import allRouters from './src/proxies';
import {createServer} from 'http';
import errorHandlingMiddleware from './src/middleware/errorHandlingMiddleware';

const app = new Koa();
const httpServer = createServer(app.callback());
const router = new Router();

app.use(logger());
app.use(json());
app.use(errorHandlingMiddleware);

router.use(allRouters.routes());

app.use(router.routes()).use(router.allowedMethods());

export const listen = (port: string) => {
  httpServer.listen(port, () => {
    console.log('server has been started on port ' + port);
  });
};
