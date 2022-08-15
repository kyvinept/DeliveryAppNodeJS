import {UserRole} from '../models/user';
import {ConfigModel} from './ConfigModel';

const config: ConfigModel = {
  baseUrl: 'http://localhost:3000',
  routes: [
    {
      route: '/api/restaurants',
      http: 'POST',
      authRequired: true,
      role: UserRole.serviceProvider,
    },
    {
      route: '/api/restaurants/:id',
      http: 'PATCH',
      authRequired: true,
      role: UserRole.serviceProvider,
    },
    {
      route: '/api/restaurants',
      http: 'GET',
      authRequired: true,
    },
    {
      route: '/api/restaurants/:id',
      http: 'GET',
      authRequired: true,
      role: UserRole.serviceProvider,
    },
  ],
};

export default config;
