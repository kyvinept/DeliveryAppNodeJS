import Router from '@koa/router';
import {
  AuthMiddleware,
  ValidatorMiddleware,
  ServiceProviderMiddleware,
} from 'middleware';
import {container} from 'tsyringe';
import Joi from 'joi';
import RestaurantController from 'controllers/restaurantController';
import {ValidationType} from 'middleware/validatorMiddleware';

const router = new Router();
const restaurantControllerInstance = container.resolve(RestaurantController);

router.post(
  '/',
  AuthMiddleware,
  ServiceProviderMiddleware,
  ValidatorMiddleware(ValidationType.body, {
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().min(10).required(),
    images: Joi.array().items(Joi.string()).min(1).required(),
    location: Joi.object({
      latitude: Joi.string().required(),
      longitude: Joi.string().required(),
    }).required(),
  }),
  restaurantControllerInstance.create,
);

router.get(
  '/',
  AuthMiddleware,
  ValidatorMiddleware(ValidationType.query, {
    page: Joi.number().min(1).default(1),
    per_page: Joi.number().min(1).default(10),
  }),
  restaurantControllerInstance.getAll,
);

router.get('/:id', AuthMiddleware, restaurantControllerInstance.getOne);

export default router;
