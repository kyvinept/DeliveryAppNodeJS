import { UserController } from "../controllers";
import Router from "@koa/router";
import { body } from "koa-req-validation";
import { AuthMiddleware } from "../middleware";

const router = new Router();

router.post(
  "/registration",
  body("email").isEmail().build(),
  body("password").isLength({ min: 6, max: 32 }).build(),
  UserController.registration
);

router.post(
  "/login",
  body("email").isEmail().build(),
  body("password").isLength({ min: 6, max: 32 }).build(),
  UserController.login
);

router.post("/logout", AuthMiddleware, UserController.logout);
// router.get("/refresh", AuthMiddleware, UserController.check);
// router.get("/users", AuthMiddleware, UserController.check);

export default router;
