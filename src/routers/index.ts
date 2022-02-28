import Router from '@koa/router';
import usersRouter from './userRouter';
import restaurantRouter from './restaurantRouter';
import orderRouter from './orderRouter';
import imageRouter from './imageRouter';
import dishRouter from './dishRouter';

const router = new Router();

router.use(usersRouter.routes());
router.use(imageRouter.routes());
router.use(orderRouter.routes());
router.use('/restaurants', restaurantRouter.routes());
router.use('/restaurants/:restaurantId/dishes', dishRouter.routes());

export default router;
