import Router from '@koa/router';
import usersRouter from './userRouter';
import restaurantRouter from './restaurantRouter';
import orderRouter from './orderRouter';
import dishRouter from './dishRouter';
import chatRouter from './chatRouter';
import messageRouter from './messageRouter';
import commentRouter from './commentRouter';
import paymentRouter from './paymentRouter';

const router = new Router();

router.use(orderRouter.routes());
router.use(usersRouter.routes());
router.use(chatRouter.routes());
router.use(messageRouter.routes());
router.use(commentRouter.routes());
router.use(paymentRouter.routes());
router.use('/restaurants', restaurantRouter.routes());
router.use(dishRouter.routes());

export default router;
