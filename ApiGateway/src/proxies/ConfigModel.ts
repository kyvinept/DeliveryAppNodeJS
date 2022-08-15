import {UserRole} from '../models/user';

export interface ConfigModel {
  baseUrl: string;
  routes: RouteModel[];
}

export interface RouteModel {
  route: string;
  http: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  authRequired?: boolean;
  role?: UserRole;
}
