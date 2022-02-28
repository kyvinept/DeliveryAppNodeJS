import {OrderStatus} from 'models/orderStatus';
import {Model} from 'objection';

export interface IOrder {
  id: number;
  restaurant_id: number;
  name: string;
  comment: string;
  address: string;
  delivery_time: Date;
  status: OrderStatus;
  user_id: number;
}

export class Order extends Model implements IOrder {
  id: number;
  restaurant_id: number;
  name: string;
  comment: string;
  address: string;
  delivery_time: Date;
  status: OrderStatus;
  user_id: number;

  static get tableName() {
    return 'Orders';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'address', 'restaurant_id', 'status', 'user_id'],

      properties: {
        id: {type: 'integer'},
        name: {type: 'string'},
        comment: {type: 'string'},
        address: {type: 'string'},
        delivery_time: {type: 'string'},
        restaurant_id: {type: 'integer'},
        user_id: {type: 'integer'},
        status: {type: 'string', default: OrderStatus.new},
      },
    };
  }
}
