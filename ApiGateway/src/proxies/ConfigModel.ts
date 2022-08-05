export interface ConfigModel {
  baseUrl: string;
  routes: RouteModel[];
}

export interface RouteModel {
  route: string;
  http: 'GET' | 'POST';
  authRequired?: boolean;
}
