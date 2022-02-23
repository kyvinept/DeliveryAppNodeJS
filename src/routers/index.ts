import Router from '@koa/router';
import usersRouter from './userRouter';
import restaurantRouter from './restaurantRouter';
import imageRouter from './imageRouter';

const router = new Router();

router.use(usersRouter.routes());
router.use(imageRouter.routes());
router.use('/restaurants', restaurantRouter.routes());

export default router;
