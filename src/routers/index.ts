import Router from "@koa/router";
import usersRouter from "./userRouter";

const router = new Router();

router.use(usersRouter.routes());

export default router;
