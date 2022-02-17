import Router from "express";
import { UserController } from "../controllers";
import { AuthMiddleware } from "../middleware";

const router = Router();

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.get("/auth", AuthMiddleware, UserController.check);

export default router;
