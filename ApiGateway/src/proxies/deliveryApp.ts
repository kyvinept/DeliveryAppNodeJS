import {ConfigModel} from './ConfigModel';

const config: ConfigModel = {
  baseUrl: 'http://localhost:3000',
  routes: [
    {
      route: '/api/restaurants',
      http: 'POST',
      authRequired: true,
    },
  ],
};

export default config;
