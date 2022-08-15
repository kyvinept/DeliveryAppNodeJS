export interface IUser {
  id: number;
  email: string;
  role: string;
}

export enum UserRole {
  user = 'USER',
  serviceProvider = 'SERVICE_PROVIDER',
  delivery = 'DELIVERY',
}
