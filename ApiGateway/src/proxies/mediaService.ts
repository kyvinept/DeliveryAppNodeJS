import {ConfigModel} from './ConfigModel';

const config: ConfigModel = {
  baseUrl: 'http://localhost:3001',
  routes: [
    {
      route: '/api/upload_image',
      http: 'POST',
      authRequired: true,
    },
    {
      http: 'GET',
      route: '/:name',
    },
  ],
};

export default config;
