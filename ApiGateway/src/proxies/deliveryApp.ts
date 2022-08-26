import {UserRole} from '../models/user';
import {ConfigModel, RouteModel} from './ConfigModel';

const restaurantRoutes: RouteModel[] = [
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
  {
    route: '/api/restaurants/:id',
    http: 'DELETE',
    authRequired: true,
    role: UserRole.serviceProvider,
  },
];

const dishRoutes: RouteModel[] = [
  {
    route: '/api/restaurants/:id/dishes',
    http: 'POST',
    authRequired: true,
    role: UserRole.serviceProvider,
  },
  {
    route: '/api/dishes/:id',
    http: 'PATCH',
    authRequired: true,
    role: UserRole.serviceProvider,
  },
  {
    route: '/api/dishes/:id',
    http: 'GET',
    authRequired: true,
  },
  {
    route: '/api/restaurants/:id/dishes',
    http: 'GET',
    authRequired: true,
  },
];

const orderRoutes: RouteModel[] = [
  {
    route: '/api/orders',
    http: 'GET',
    authRequired: true,
  },
  {
    route: '/api/restaurants/:id/orders',
    http: 'GET',
    authRequired: true,
  },
  {
    route: '/api/orders/:id',
    http: 'PATCH',
    authRequired: true,
    role: UserRole.delivery,
  },
  {
    route: '/api/restaurants/:id/orders',
    http: 'POST',
    authRequired: true,
    role: UserRole.user,
  },
  {
    route: '/api/orders/:id',
    http: 'DELETE',
    authRequired: true,
  },
];

const chatRoutes: RouteModel[] = [
  {
    route: '/api/chats',
    http: 'POST',
    authRequired: true,
  },
  {
    route: '/api/chats',
    http: 'GET',
    authRequired: true,
  },
  {
    route: '/api/chats/:id',
    http: 'DELETE',
    authRequired: true,
  },
];

const commentRoutes: RouteModel[] = [
  {
    route: '/api/restaurants/:id/comments',
    http: 'POST',
    authRequired: true,
    role: UserRole.user,
  },
  {
    route: '/api/comments/:id',
    http: 'PATCH',
    authRequired: true,
    role: UserRole.user,
  },
  {
    route: '/api/restaurants/:id/comments',
    http: 'GET',
    authRequired: true,
  },
];

const messageRoutes: RouteModel[] = [
  {
    route: '/api/chats/:id/messages',
    http: 'GET',
    authRequired: true,
  },
];

const paymentRoutes: RouteModel[] = [
  {
    route: '/api/payments/:id/confirm',
    http: 'PATCH',
    authRequired: true,
    role: UserRole.user,
  },
  {
    route: '/api/orders/:id/payment_details',
    http: 'GET',
    authRequired: true,
    role: UserRole.user,
  },
];

const purchaseRoutes: RouteModel[] = [
  {
    route: '/api/purchases/verify',
    http: 'POST',
    authRequired: true,
    role: UserRole.user,
  },
];

const pushNotificationRoutes: RouteModel[] = [
  {
    route: '/api/push-notification/register',
    http: 'POST',
    authRequired: true,
  },
];

const config: ConfigModel = {
  baseUrl: 'http://localhost:3000',
  routes: [
    ...restaurantRoutes,
    ...dishRoutes,
    ...orderRoutes,
    ...chatRoutes,
    ...commentRoutes,
    ...messageRoutes,
    ...paymentRoutes,
    ...purchaseRoutes,
    ...pushNotificationRoutes,
  ],
};

export default config;
