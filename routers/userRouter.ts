import Router from "express";
import { UserController } from "../controllers";

const router = Router();

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.get("/auth", UserController.auth);

export default router;
