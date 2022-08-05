import {ConfigModel} from './ConfigModel';

const config: ConfigModel = {
  baseUrl: 'http://localhost:3003',
  routes: [
    {
      route: '/api/registration',
      http: 'POST',
    },
    {
      route: '/api/registration_passkeys_initialize',
      http: 'POST',
    },
    {
      route: '/api/users/:user_id/registration_passkeys_finalize',
      http: 'POST',
    },
    {
      route: '/api/login_passkeys_initialize',
      http: 'POST',
    },
    {
      route: '/api/login_passkeys_finalize',
      http: 'POST',
    },
    {
      route: '/api/login',
      http: 'POST',
    },
    {
      route: '/api/logout',
      http: 'POST',
      authRequired: true,
    },
    {
      route: '/api/refresh',
      http: 'POST',
    },
    {
      route: '/api/forget_password',
      http: 'POST',
    },
    {
      route: '/api/recover_password',
      http: 'POST',
    },
  ],
};

export default config;
