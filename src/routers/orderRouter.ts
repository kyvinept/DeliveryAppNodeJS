import Router from '@koa/router';
import {AuthMiddleware, ValidatorMiddleware} from 'middleware';
import {container} from 'tsyringe';
import Joi from 'joi';
import {ValidationType} from 'middleware/validatorMiddleware';
import OrderController from 'controllers/orderController';

const router = new Router();
const orderControllerInstance = container.resolve(OrderController);

router.get(
  '/orders',
  AuthMiddleware,
  ValidatorMiddleware(ValidationType.query, {
    page: Joi.number().min(1).default(1),
    per_page: Joi.number().min(1).default(10),
  }),
  orderControllerInstance.getAllForUser,
);

router.post(
  '/restaurants/:id/orders',
  AuthMiddleware,
  ValidatorMiddleware(ValidationType.body, {
    name: Joi.string().min(2).max(100).required(),
    comment: Joi.string(),
    dish_ids: Joi.array().items(Joi.number()).min(1).required(),
    address: Joi.string().min(3).required(),
    delivery_time: Joi.date(),
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
