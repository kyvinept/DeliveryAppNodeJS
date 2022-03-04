import Router from '@koa/router';
import {AuthMiddleware, ValidatorMiddleware} from 'middleware';
import {container} from 'tsyringe';
import Joi from 'joi';
import {ValidationType} from 'middleware/validatorMiddleware';
import ChatController from 'controllers/chatController';
import joiValidation from 'constants/joiValidation';

const router = new Router();
const chatControllerInstance = container.resolve(ChatController);

router.post(
  '/users/:user_id/chats',
  AuthMiddleware,
  ValidatorMiddleware(ValidationType.body, {
    name: Joi.string().min(2).max(100).required(),
  }),
  ValidatorMiddleware(ValidationType.link, {
    user_id: Joi.number().min(1).required(),
  }),
  chatControllerInstance.create,
);

router.get(
  '/chats',
  AuthMiddleware,
  ValidatorMiddleware(ValidationType.query, joiValidation.paggination),
  chatControllerInstance.getAll,
);

export default router;
