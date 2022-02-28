import ApiError from 'errors/ApiError';
import strings from 'strings';
import {injectable} from 'tsyringe';
import OrderRepository from 'repositories/orderRepository';
import RestaurantOrderRepository from 'repositories/restaurantOrderRepository';

export interface OrderModel {
  restaurantId: number;
  name: string;
  comment: string;
  dishIds: number[];
  address: string;
  deliveryTime?: Date;
  userId: number;
}

@injectable()
class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private restaurantOrderRepository: RestaurantOrderRepository,
  ) {}

  create = async (model: OrderModel) => {
    const order = await this.orderRepository.create({
      restaurant_id: model.restaurantId,
      name: model.name,
      comment: model.comment,
      address: model.address,
      delivery_time: model.deliveryTime,
      user_id: model.userId,
    });

    for (let index = 0; index < model.dishIds.length; index++) {
      const element = model.dishIds[index];
      await this.restaurantOrderRepository.create({
        dish_id: element,
        order_id: order.id,
      });
    }

    return {...order, dish_ids: model.dishIds};
  };

  delete = async (id: number) => {
    await this.restaurantOrderRepository.deleteWhere('order_id', id);
    await this.orderRepository.deleteWhere('id', id);
  };

  getAllForUser = async (userId: number, page: number, perPage: number) => {
    const whereCondition = {user_id: userId};

    const data = await this.orderRepository.getAllWithPagination(
      page,
      perPage,
      whereCondition,
    );
    return data;
  };
}

export default OrderService;
