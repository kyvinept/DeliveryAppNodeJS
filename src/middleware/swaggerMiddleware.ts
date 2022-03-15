import {getServerHost} from 'helpers/getServerHost';
import {koaSwagger} from 'koa2-swagger-ui';
import swaggerJSDoc from 'swagger-jsdoc';

function createSwaggerMiddleware(
  app,
  {apiUrl, version, title, parseOnRequest, apis, securityDefinitions},
) {
  console.log('createSwaggerMiddleware');

  const swaggerJsonPath = '/swagger.json';

  let swaggerSpec;

  app.use((ctx, next) => {
    console.log(getServerHost(ctx) + 'api' + swaggerJsonPath);

    app.use(
      // @ts-ignore
      koaSwagger({
        title,
        swaggerVersion: '3.30.2',
        routePrefix: '/api/swagger',
        swaggerOptions: {
          url: getServerHost(ctx) + 'api' + swaggerJsonPath,
          showRequestHeaders: true,
        },
        hideTopbar: true,
      }),
    );

    if (ctx.path === '/api' + swaggerJsonPath) {
      if (!swaggerSpec || parseOnRequest) {
        // openapi 3.0
        swaggerSpec = swaggerJSDoc({
          apis,
          definition: {
            openapi: '3.0.0',
            info: {
              title,
              version,
            },
            components: {
              securitySchemes: {
                bearerAuth: {
                  type: 'http',
                  scheme: 'bearer',
                  bearerFormat: 'JWT',
                },
              },
            },
            security: [
              {
                bearerAuth: [],
              },
            ],
            servers: [
              {
                url: apiUrl,
              },
            ],
          },
        });
      }

      ctx.body = swaggerSpec;

      return;
    }

    return next();
  });
}

export default createSwaggerMiddleware;
