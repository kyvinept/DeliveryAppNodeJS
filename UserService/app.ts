import Koa from 'koa';
import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import {ErrorHandlingMiddleware} from './src/middleware';
import Router from '@koa/router';
import routers from './src/routers';
import {createServer} from 'http';
import cors from '@koa/cors';
import ApiError from 'errors/ApiError';

const app = new Koa();
const httpServer = createServer(app.callback());
const router = new Router();

router.use('/api', routers.routes());

app.use(logger());
app.use(json());
app.use(bodyParser());
app.use(ErrorHandlingMiddleware);

app.use(async (ctx, next) => {
  if (!ctx.request.origin.includes(process.env.ALLOWED_ORIGIN)) {
    throw ApiError.notFound('Not found');
  }

  await next();
});

app.use(router.routes()).use(router.allowedMethods());

export const listen = (port: string) => {
  httpServer.listen(port, () => {
    console.log('server has been started on port ' + port);
  });
};
