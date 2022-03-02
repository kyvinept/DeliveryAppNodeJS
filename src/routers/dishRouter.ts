import Router from '@koa/router';
import {
  AuthMiddleware,
  UserRoleMiddleware,
  UploadImageMiddleware,
  ValidatorMiddleware,
} from 'middleware';
import {container} from 'tsyringe';
import Joi from 'joi';
import {ValidationType} from 'middleware/validatorMiddleware';
import DishController from 'controllers/dishController';
import {DishType} from 'models/dishType';
import {UserRole} from 'models/database/user';
import joiValidation from 'constants/joiValidation';

const router = new Router();
const dishControllerInstance = container.resolve(DishController);

router.post(
  '/',
  AuthMiddleware,
  UserRoleMiddleware(UserRole.serviceProvider),
  ValidatorMiddleware(ValidationType.body, {
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().min(10).required(),
    images: Joi.array().items(Joi.string().uri()).min(1).required(),
    price: Joi.number().min(0).required(),
    type: Joi.string()
      .valid(...Object.values(DishType).map((item) => item.toString()))
      .default(DishType.regular),
  }),
  ValidatorMiddleware(ValidationType.link, {
    restaurantId: Joi.number().min(1).required(),
  }),
  dishControllerInstance.create,
);

router.patch(
  '/:id',
  AuthMiddleware,
  UserRoleMiddleware(UserRole.serviceProvider),
  ValidatorMiddleware(ValidationType.body, {
    name: Joi.string().min(2).max(100),
    description: Joi.string().min(10),
    images: Joi.array().items(Joi.string().uri()).min(1),
    price: Joi.number().min(0),
    type: Joi.string().valid(
      ...Object.values(DishType).map((item) => item.toString()),
    ),
  }),
  ValidatorMiddleware(ValidationType.link, {
    restaurantId: Joi.number().min(1).required(),
    id: Joi.number().min(1).required(),
  }),
  dishControllerInstance.update,
);

router.get(
  '/:id',
  AuthMiddleware,
  ValidatorMiddleware(ValidationType.link, {
    restaurantId: Joi.number().min(1).required(),
    id: Joi.number().min(1).required(),
  }),
  dishControllerInstance.getOne,
);

router.get(
  '/',
  AuthMiddleware,
  ValidatorMiddleware(ValidationType.link, {
    restaurantId: Joi.number().min(1).required(),
  }),
  ValidatorMiddleware(ValidationType.query, joiValidation.paggination),
  dishControllerInstance.getAll,
);

router.post(
  '/upload_image',
  AuthMiddleware,
  UserRoleMiddleware(UserRole.serviceProvider),
  UploadImageMiddleware,
  dishControllerInstance.uploadImage,
);

export default router;
