import Koa from 'koa';
import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import {ErrorHandlingMiddleware} from './src/middleware';
import Router from '@koa/router';
import routers from './src/routers';
import imageRouter from './src/routers/imageRouter';
import {SocketServer} from 'sockets';
import {createServer} from 'http';
import {container} from 'tsyringe';
import StripeService from 'services/stripeService';
import {koaSwagger} from 'koa2-swagger-ui';
import yamljs from 'yamljs';

const app = new Koa();
const httpServer = createServer(app.callback());
const socketServerInstance = container.resolve(SocketServer);
socketServerInstance.configure(httpServer);
const router = new Router();

router.use('/api', routers.routes());

const spec = yamljs.load('./src/docs/_build/index.yaml');
router.get('/docs', koaSwagger({routePrefix: false, swaggerOptions: {spec}}));
router.use(imageRouter.routes());

app.use(logger());
app.use(json());
app.use(bodyParser());
app.use(ErrorHandlingMiddleware);
app.use(router.routes()).use(router.allowedMethods());

export const listen = (port: string) => {
  httpServer.listen(port, () => {
    console.log('server has been started on port ' + port);
    new StripeService();
  });
};
