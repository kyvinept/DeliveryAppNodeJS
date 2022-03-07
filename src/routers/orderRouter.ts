import Router from '@koa/router';
import {
  AuthMiddleware,
  UserRoleMiddleware,
  ValidatorMiddleware,
} from 'middleware';
import {container} from 'tsyringe';
import Joi from 'joi';
import {ValidationType} from 'middleware/validatorMiddleware';
import OrderController from 'controllers/orderController';
import {UserRole} from 'models/database/user';
import {OrderStatus} from 'models/orderStatus';
import joiValidation from 'constants/joiValidation';

const router = new Router();
const orderControllerInstance = container.resolve(OrderController);

router.get(
  '/orders',
  AuthMiddleware,
  ValidatorMiddleware(ValidationType.query, joiValidation.paggination),
  orderControllerInstance.getAll,
);

router.patch(
  '/orders/:id',
  AuthMiddleware,
  UserRoleMiddleware(UserRole.delivery),
  ValidatorMiddleware(ValidationType.body, {
    status: Joi.string()
      .valid(...Object.values(OrderStatus).map((item) => item.toString()))
      .required(),
  }),
  ValidatorMiddleware(ValidationType.link, {
    id: Joi.number().required(),
  }),
  orderControllerInstance.changeStatus,
);

router.get(
  '/restaurants/:id/orders',
  AuthMiddleware,
  ValidatorMiddleware(ValidationType.link, {
    id: Joi.number().min(1).required(),
  }),
  ValidatorMiddleware(ValidationType.query, joiValidation.paggination),
  orderControllerInstance.getAllForRestaurant,
);

router.post(
  '/restaurants/:id/orders',
  AuthMiddleware,
  UserRoleMiddleware(UserRole.user),
  ValidatorMiddleware(ValidationType.body, {
    name: Joi.string().min(2).max(100).required(),
    comment: Joi.string(),
    dish_ids: Joi.array().items(Joi.number()).min(1).required(),
    address: Joi.string().min(3).required(),
    delivery_time: joiValidation.optionalDate,
  }),
  ValidatorMiddleware(ValidationType.link, {
    id: Joi.number().min(1).required(),
  }),
  orderControllerInstance.create,
);

router.delete(
  '/restaurants/:id/orders',
  AuthMiddleware,
  ValidatorMiddleware(ValidationType.link, {
    id: Joi.number().min(1).required(),
  }),
  orderControllerInstance.delete,
);

export default router;
