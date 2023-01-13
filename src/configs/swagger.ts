import createSwaggerMiddleware from 'middleware/swaggerMiddleware';
import Koa from 'koa';
import path from 'path';

const configure = (app: Koa) => {
  createSwaggerMiddleware(app, {
    title: 'The Service',
    version: '1.0.0',
    apiUrl: 'https://delivery-app-for-client-apps.herokuapp.com/api',
    parseOnRequest: false,
    apis: [path.join(process.cwd(), '/src/routers/*.ts')],
    securityDefinitions: {
      jwt: {
        description: 'Api auth token',
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
  });
};

export default configure;