import ImageController from 'controllers/imageController';
import Router from '@koa/router';
import {UploadImageMiddleware, ValidatorMiddleware} from 'middleware';
import {container} from 'tsyringe';
import Joi from 'joi';
import {ValidationType} from 'middleware/validatorMiddleware';

const router = new Router();
const imageControllerInstance = container.resolve(ImageController);

router.get(
  '/:name',
  ValidatorMiddleware(ValidationType.link, {name: Joi.string().required()}),
  imageControllerInstance.getImage,
);

router.post(
  '/api/upload_image',
  UploadImageMiddleware,
  imageControllerInstance.save,
);

export default router;
