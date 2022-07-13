import {Model} from 'objection';

export interface IUser {
  id: number;
  email: string;
  role: string;
  forget_password_token?: string;
  registration_type?: string;
}

export enum UserRole {
  user = 'USER',
  serviceProvider = 'SERVICE_PROVIDER',
  delivery = 'DELIVERY',
}

export enum RegistrationType {
  password = 'password',
  passkeys = 'passkeys'
}

export class User extends Model implements IUser {
  id: number;
  email: string;
  password: string;
  role: string;
  registration_type?: string;
  forget_password_token?: string;

  static get tableName() {
    return 'Users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'role'],

      properties: {
        id: {type: 'integer'},
        email: {type: 'string'},
        password: {type: 'string'},
        forget_password_token: {type: 'string'},
        role: {type: 'string', default: UserRole.user},
        registration_type: {type: 'string', default: RegistrationType.password}
      },
    };
  }
}
