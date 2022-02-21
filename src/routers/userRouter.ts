import { UserController } from "controllers";
import Router from "@koa/router";
import { body, query } from "koa-req-validation";
import { AuthMiddleware } from "middleware";
import { UserRole } from "models/database/user";

const router = new Router();

console.log(
  "values",
  Object.values(UserRole).map((item) => item.toString())
);

router.post(
  "/registration",
  body("email").isEmail().build(),
  body("password").isLength({ min: 6, max: 32 }).build(),
  body("role")
    .isIn(Object.values(UserRole).map((item) => item.toString()))
    .build(),
  UserController.registration
);

router.post(
  "/login",
  body("email").isEmail().build(),
  body("password").isLength({ min: 6, max: 32 }).build(),
  UserController.login
);

router.post("/logout", AuthMiddleware, UserController.logout);

router.post(
  "/refresh",
  body("refreshToken").isJWT().build(),
  UserController.refresh
);
// router.get("/users", AuthMiddleware, UserController.check);

export default router;
