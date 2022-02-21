import { UserController } from "controllers";
import Router from "@koa/router";
import { AuthMiddleware, ValidatorMiddleware } from "middleware";
import { UserRole } from "models/database/user";
import { container } from "tsyringe";
import Joi from "joi";

const router = new Router();
const userControllerInstance = container.resolve(UserController);

router.post(
  "/registration",
  ValidatorMiddleware({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).max(32).required(),
    role: Joi.string()
      .valid(...Object.values(UserRole).map((item) => item.toString()))
      .required(),
  }),
  userControllerInstance.registration
);

router.post(
  "/login",
  ValidatorMiddleware({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).max(32).required(),
  }),
  userControllerInstance.login
);

router.post("/logout", AuthMiddleware, userControllerInstance.logout);

router.post(
  "/refresh",
  ValidatorMiddleware({
    refreshToken: Joi.string().required(),
    userId: Joi.number().required(),
  }),
  userControllerInstance.refresh
);
// router.get("/users", AuthMiddleware, UserController.check);

export default router;
