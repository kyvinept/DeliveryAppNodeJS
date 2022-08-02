import proxy from 'koa-proxies';

const config = {
  baseUrl: 'http://localhost:3000',
  routes: [
    {
      route: '/api/registration',
    },
    {
      route: '/api/registration_passkeys_initialize',
    },
    {
      route: '/api/users/:user_id/registration_passkeys_finalize',
    },
    {
      route: '/api/login_passkeys_initialize',
    },
    {
      route: '/api/login_passkeys_finalize',
    },
    {
      route: '/api/login',
    },
    {
      route: '/api/logout',
    },
    {
      route: '/api/refresh',
    },
    {
      route: '/api/forget_password',
    },
    {
      route: '/api/recover_password',
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
