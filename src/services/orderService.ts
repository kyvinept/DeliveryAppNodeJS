import ApiError from 'errors/ApiError';
import strings from 'strings';
import {injectable} from 'tsyringe';
import OrderRepository from 'repositories/orderRepository';
import RestaurantOrderRepository from 'repositories/restaurantOrderRepository';
import {OrderStatus} from 'models/orderStatus';
import {OrderGraphFetched} from 'models/database/order';

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
      delivery_time: model.deliveryTime.toISOString(),
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

  getAllForRestaurant = async (
    page: number,
    perPage: number,
    restaurantId: number,
    userId: number = null,
  ) => {
    const whereModel = {restaurant_id: restaurantId} as any;
    if (userId) {
      whereModel.user_id = userId;
    }

    const data = await this.orderRepository.getAllWithPagination({
      page,
      perPage,
      whereModel,
      graphFetched: OrderGraphFetched.dishes,
    });

    return data;
  };

  getAll = async (page: number, perPage: number, userId: number = null) => {
    const whereModel = {} as any;
    if (userId) {
      whereModel.user_id = userId;
    }

    const data = await this.orderRepository.getAllWithPagination({
      page,
      perPage,
      whereModel,
      graphFetched: OrderGraphFetched.dishes,
    });
    return data;
  };

  changeStatus = async (id: number, status: OrderStatus) => {
    const order = await this.orderRepository.findOneByCondition(
      {id},
      OrderGraphFetched.dishes,
    );
    if (!order) {
      throw ApiError.unprocessableEntity(strings.order.orderNotFound);
    }

    order.status = status;
    await this.orderRepository.update(order);
    return order;
  };
}

export default OrderService;
