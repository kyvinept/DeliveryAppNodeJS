import Router from '@koa/router';
import {
  AuthMiddleware,
  UserRoleMiddleware,
  ValidatorMiddleware,
} from 'middleware';
import {container} from 'tsyringe';
import Joi from 'joi';
import {ValidationType} from 'middleware/validatorMiddleware';
import joiValidation from 'constants/joiValidation';
import CommentController from 'controllers/commentController';
import {UserRole} from 'models/database/user';

const router = new Router();
const commentControllerInstance = container.resolve(CommentController);

router.post(
  '/restaurants/:id/comments',
  AuthMiddleware,
  UserRoleMiddleware(UserRole.user),
  ValidatorMiddleware(ValidationType.body, {
    comment: Joi.string().min(2).required(),
    rating: Joi.number().min(0).max(5).required(),
  }),
  ValidatorMiddleware(ValidationType.link, {
    id: joiValidation.id,
  }),
  commentControllerInstance.create,
);

router.patch(
  '/comments/:id',
  AuthMiddleware,
  UserRoleMiddleware(UserRole.user),
  ValidatorMiddleware(ValidationType.body, {
    comment: Joi.string().min(2),
    rating: Joi.number().min(0).max(5),
  }),
  ValidatorMiddleware(ValidationType.link, {
    id: joiValidation.id,
  }),
  commentControllerInstance.update,
);

router.get(
  '/restaurants/:id/comments',
  AuthMiddleware,
  ValidatorMiddleware(ValidationType.link, {
    id: joiValidation.id,
  }),
  ValidatorMiddleware(ValidationType.query, joiValidation.paggination),
  commentControllerInstance.getAll,
);

export default router;
