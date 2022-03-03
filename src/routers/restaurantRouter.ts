import Router from '@koa/router';
import {
  AuthMiddleware,
  ValidatorMiddleware,
  UserRoleMiddleware,
  UploadImageMiddleware,
  ImageValidatorMiddleware,
} from 'middleware';
import {container} from 'tsyringe';
import Joi from 'joi';
import RestaurantController from 'controllers/restaurantController';
import {ValidationType} from 'middleware/validatorMiddleware';
import {UserRole} from 'models/database/user';
import joiValidation from 'constants/joiValidation';
import {ImageType} from 'models/imageType';

const router = new Router();
const restaurantControllerInstance = container.resolve(RestaurantController);

router.post(
  '/',
  AuthMiddleware,
  UserRoleMiddleware(UserRole.serviceProvider),
  ValidatorMiddleware(ValidationType.body, {
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().min(10).required(),
    images: joiValidation.optionalImages.required(),
    location: joiValidation.optionalLocation.required(),
  }),
  ImageValidatorMiddleware(ImageType.restaurant),
  restaurantControllerInstance.create,
);

router.patch(
  '/:id',
  AuthMiddleware,
  UserRoleMiddleware(UserRole.serviceProvider),
  ValidatorMiddleware(ValidationType.link, {
    id: Joi.number().min(1).required(),
  }),
  ValidatorMiddleware(ValidationType.body, {
    name: Joi.string().min(2).max(100),
    description: Joi.string().min(10),
    images: joiValidation.optionalImages,
    location: joiValidation.optionalLocation,
  }),
  ImageValidatorMiddleware(ImageType.restaurant),
  restaurantControllerInstance.update,
);

router.get(
  '/',
  AuthMiddleware,
  ValidatorMiddleware(ValidationType.query, joiValidation.paggination),
  restaurantControllerInstance.getAll,
);

router.get(
  '/:id',
  AuthMiddleware,
  ValidatorMiddleware(ValidationType.link, {
    id: Joi.number().min(1).required(),
  }),
  restaurantControllerInstance.getOne,
);

router.delete(
  '/:id',
  AuthMiddleware,
  UserRoleMiddleware(UserRole.serviceProvider),
  ValidatorMiddleware(ValidationType.link, {
    id: Joi.number().min(1).required(),
  }),
  restaurantControllerInstance.delete,
);

router.post(
  '/upload_image',
  AuthMiddleware,
  UserRoleMiddleware(UserRole.serviceProvider),
  UploadImageMiddleware,
  restaurantControllerInstance.uploadImage,
);

export default router;
