import Router from '@koa/router';
import {AuthMiddleware, ValidatorMiddleware} from 'middleware';
import {container} from 'tsyringe';
import {ValidationType} from 'middleware/validatorMiddleware';
import joiValidation from 'constants/joiValidation';
import MessageController from 'controllers/messageController';
import Joi from 'joi';

const router = new Router();
const messageControllerInstance = container.resolve(MessageController);

router.get(
  '/chats/:id/messages',
  AuthMiddleware,
  ValidatorMiddleware(ValidationType.link, {
    id: Joi.number().min(1).required(),
  }),
  ValidatorMiddleware(ValidationType.query, joiValidation.paggination),
  messageControllerInstance.getAll,
);

export default router;
