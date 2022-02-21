import { UserController } from "controllers";
import Router from "@koa/router";
import { body } from "koa-req-validation";
import { AuthMiddleware } from "middleware";
import { UserRole } from "models/database/user";
import { container } from "tsyringe";

const router = new Router();
const userControllerInstance = container.resolve(UserController);

router.post(
  "/registration",
  body("email").isEmail().build(),
  body("password").isLength({ min: 6, max: 32 }).build(),
  body("role")
    .isIn(Object.values(UserRole).map((item) => item.toString()))
    .build(),
  userControllerInstance.registration
);

router.post(
  "/login",
  body("email").isEmail().build(),
  body("password").isLength({ min: 6, max: 32 }).build(),
  userControllerInstance.login
);

router.post("/logout", AuthMiddleware, userControllerInstance.logout);

router.post(
  "/refresh",
  body("refreshToken").isJWT().build(),
  userControllerInstance.refresh
);
// router.get("/users", AuthMiddleware, UserController.check);

export default router;
