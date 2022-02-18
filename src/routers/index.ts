import Router from "express";
import usersRouter from "./userRouter";

const router = Router();

// router.use("/users", usersRouter);
router.use(usersRouter);

export default router;
