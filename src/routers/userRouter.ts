import Router from "express";
import { UserController } from "../controllers";
import { AuthMiddleware } from "../middleware";
import { body } from "express-validator";

const router = Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 32 }),
  UserController.registration
);

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 32 }),
  UserController.login
);

router.post("/logout", AuthMiddleware, UserController.logout);
// router.get("/activate/:link", AuthMiddleware, UserController.check);
// router.get("/refresh", AuthMiddleware, UserController.check);
// router.get("/users", AuthMiddleware, UserController.check);

export default router;
