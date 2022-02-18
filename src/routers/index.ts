import Router from "@koa/router";
import usersRouter from "./userRouter";

const router = new Router();

// router.use("/users", usersRouter);
// router.use(usersRouter.routes());

export default usersRouter;
