import Router from "@koa/router";
import fs from 'fs';

const router = new Router();

router.get('/.well-known/apple-app-site-association', (ctx,next) => {
  let data = fs.readFileSync('./public/.well-known/apple-app-site-association', 'utf8')
  ctx.body = JSON.parse(data);
  ctx.status = 200
});

export default router;