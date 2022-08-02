import proxy from 'koa-proxies';

const config = {
  baseUrl: 'http://localhost:3001',
  routes: [
    {
      route: '/api/upload_image',
    },
    {
      route: '/:name',
    },
  ],
};

const proxies = config.routes.map((item) => {
  return proxy(item.route, {
    target: config.baseUrl,
    changeOrigin: false,
    logs: true,
  });
});

export default proxies;
