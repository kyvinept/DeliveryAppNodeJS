import Koa from 'koa';
import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router';
import routers from './src/routers';
import {createServer} from 'http';

const app = new Koa();
const httpServer = createServer(app.callback());
const router = new Router();

router.use('/api', routers.routes());

app.use(logger());
app.use(json());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

export const listen = (port: string) => {
  httpServer.listen(port, () => {
    console.log('server has been started on port ' + port);
  });
};