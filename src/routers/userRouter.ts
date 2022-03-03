import UserController from 'controllers/userController';
import Router from '@koa/router';
import {AuthMiddleware, ValidatorMiddleware} from 'middleware';
import {UserRole} from 'models/database/user';
import {container} from 'tsyringe';
import Joi from 'joi';
import {ValidationType} from 'middleware/validatorMiddleware';
import joiValidation from 'constants/joiValidation';

const router = new Router();
const userControllerInstance = container.resolve(UserController);

router.post(
  '/registration',
  ValidatorMiddleware(ValidationType.body, {
    email: joiValidation.email,
    password: joiValidation.password,
    role: Joi.string()
      .valid(...Object.values(UserRole).map((item) => item.toString()))
      .required(),
  }),
  userControllerInstance.registration,
);

router.post(
  '/login',
  ValidatorMiddleware(ValidationType.body, {
    email: joiValidation.email,
    password: joiValidation.password,
  }),
  userControllerInstance.login,
);

router.post('/logout', AuthMiddleware, userControllerInstance.logout);

router.post(
  '/refresh',
  ValidatorMiddleware(ValidationType.body, {
    refreshToken: Joi.string().required(),
  }),
  userControllerInstance.refresh,
);

router.post(
  '/forget_password',
  ValidatorMiddleware(ValidationType.body, {
    email: joiValidation.email,
  }),
  userControllerInstance.forgetPassword,
);

router.post(
  '/recover_password',
  ValidatorMiddleware(ValidationType.body, {
    token: Joi.string().required(),
    password: joiValidation.password,
    repeat_password: Joi.string().required().valid(Joi.ref('password')),
  }),
  userControllerInstance.recoverPassword,
);

export default router;
