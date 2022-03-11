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

/**
 * @openapi
 * /registration:
 *   post:
 *     summary: Registration
 *     tags:
 *      - auth
 *     requestBody:
 *      description: Body to sign up
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              role:
 *                type: string
 *                example: USER|DELIVERY|SERVICE_PROVIDER
 *            required:
 *              - email
 *              - password
 *              - role
 *     responses:
 *       200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    accessToken:
 *                      type: string
 *                    refreshToken:
 *                      type: string
 *       422:
 *        description: Unprocessable entity error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                    errors:
 *                      type: array
 *                      items:
 *                        type: object
 */
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

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Login
 *     tags:
 *      - auth
 *     requestBody:
 *      description: Body to login
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *            required:
 *              - email
 *              - password
 *     responses:
 *       200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    accessToken:
 *                      type: string
 *                    refreshToken:
 *                      type: string
 *       404:
 *        description: Not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                    errors:
 *                      type: array
 *                      items:
 *                        type: object
 *       422:
 *        description: Unprocessable entity error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                    errors:
 *                      type: array
 *                      items:
 *                        type: object
 */
router.post(
  '/login',
  ValidatorMiddleware(ValidationType.body, {
    email: joiValidation.email,
    password: joiValidation.password,
  }),
  userControllerInstance.login,
);

/**
 * @openapi
 * /logout:
 *   post:
 *     summary: Logout
 *     tags:
 *      - auth
 *     responses:
 *       200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *       401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                    errors:
 *                      type: array
 *                      items:
 *                        type: object
 */
router.post('/logout', AuthMiddleware, userControllerInstance.logout);

/**
 * @openapi
 * /refresh:
 *   post:
 *     summary: Refresh
 *     tags:
 *      - auth
 *     requestBody:
 *      description: Body to refresh
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              refreshToken:
 *                type: string
 *            required:
 *              - refreshToken
 *     responses:
 *       200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    accessToken:
 *                      type: string
 *                    refreshToken:
 *                      type: string
 *       422:
 *        description: Unprocessable entity error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                    errors:
 *                      type: array
 *                      items:
 *                        type: object
 */
router.post(
  '/refresh',
  ValidatorMiddleware(ValidationType.body, {
    refreshToken: Joi.string().required(),
  }),
  userControllerInstance.refresh,
);

/**
 * @openapi
 * /forget_password:
 *   post:
 *     summary: Forget password
 *     tags:
 *      - auth
 *     requestBody:
 *      description: Body to forget password
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *            required:
 *              - email
 *     responses:
 *       200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *       422:
 *        description: Unprocessable entity error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                    errors:
 *                      type: array
 *                      items:
 *                        type: object
 */
router.post(
  '/forget_password',
  ValidatorMiddleware(ValidationType.body, {
    email: joiValidation.email,
  }),
  userControllerInstance.forgetPassword,
);

/**
 * @openapi
 * /recover_password:
 *   post:
 *     summary: Recover password
 *     tags:
 *      - auth
 *     requestBody:
 *      description: Body to recover password
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              token:
 *                type: string
 *              password:
 *                type: string
 *              repeat_password:
 *                type: string
 *            required:
 *              - token
 *              - password
 *              - repeat_password
 *     responses:
 *       200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *       422:
 *        description: Unprocessable entity error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                    errors:
 *                      type: array
 *                      items:
 *                        type: object
 */
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
