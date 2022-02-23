import UserController from 'controllers/userController';
import Router from '@koa/router';
import {AuthMiddleware, ValidatorMiddleware} from 'middleware';
import {UserRole} from 'models/database/user';
import {container} from 'tsyringe';
import Joi from 'joi';
import {ValidationType} from 'middleware/validatorMiddleware';

const router = new Router();
const userControllerInstance = container.resolve(UserController);

router.post(
  '/registration',
  ValidatorMiddleware(ValidationType.body, {
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).max(32).required(),
    role: Joi.string()
      .valid(...Object.values(UserRole).map((item) => item.toString()))
      .required(),
  }),
  userControllerInstance.registration,
);

router.post(
  '/login',
  ValidatorMiddleware(ValidationType.body, {
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).max(32).required(),
  }),
  userControllerInstance.login,
);

router.post('/logout', AuthMiddleware, userControllerInstance.logout);

router.post(
  '/refresh',
  ValidatorMiddleware(ValidationType.body, {
    refreshToken: Joi.string().required(),
    userId: Joi.number().required(),
  }),
  userControllerInstance.refresh,
);

export default router;
