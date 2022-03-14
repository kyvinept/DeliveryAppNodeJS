import Router from '@koa/router';
import {
  AuthMiddleware,
  UserRoleMiddleware,
  ValidatorMiddleware,
} from 'middleware';
import {container} from 'tsyringe';
import {ValidationType} from 'middleware/validatorMiddleware';
import joiValidation from 'constants/joiValidation';
import {UserRole} from 'models/database/user';
import PurchaseController from 'controllers/purchaseController';
import Joi from 'joi';
import {PurchasePlatform} from 'models/purchasePlatform';

const router = new Router();
const purchaseControllerInstance = container.resolve(PurchaseController);

router.post(
  '/purchases/verify',
  AuthMiddleware,
  UserRoleMiddleware(UserRole.user),
  ValidatorMiddleware(ValidationType.body, {
    receipt: joiValidation.requiredString,
    platform: Joi.string()
      .valid(...Object.values(PurchasePlatform).map((item) => item.toString()))
      .required(),
  }),
  purchaseControllerInstance.verify,
);

export default router;
