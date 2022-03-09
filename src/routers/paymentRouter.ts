import Router from '@koa/router';
import {
  AuthMiddleware,
  UserRoleMiddleware,
  ValidatorMiddleware,
} from 'middleware';
import {container} from 'tsyringe';
import {ValidationType} from 'middleware/validatorMiddleware';
import joiValidation from 'constants/joiValidation';
import PaymentController from 'controllers/paymentController';
import {UserRole} from 'models/database/user';

const router = new Router();
const paymentControllerInstance = container.resolve(PaymentController);

router.patch(
  '/payments/:id/confirm',
  AuthMiddleware,
  UserRoleMiddleware(UserRole.user),
  ValidatorMiddleware(ValidationType.link, {
    id: joiValidation.id,
  }),
  paymentControllerInstance.confirmPayment,
);

router.get(
  '/orders/:id/payment_details',
  AuthMiddleware,
  UserRoleMiddleware(UserRole.user),
  ValidatorMiddleware(ValidationType.link, {
    id: joiValidation.id,
  }),
  paymentControllerInstance.getPayment,
);

export default router;
