import "dotenv/config";
import routers from "./src/routers";
import { ErrorHandlingMiddleware } from "./src/middleware";
import "./src/models/database/user";
import Koa from "koa";
import Router from "@koa/router";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";

const PORT = process.env.PORT || 5000;

const app = new Koa();
const router = new Router();

router.use("/api", routers.routes());
app.use(logger());
app.use(json());
app.use(bodyParser());
app.use(ErrorHandlingMiddleware);
app.use(router.routes()).use(router.allowedMethods());

const start = async () => {
  try {
    app.listen(PORT, () =>
      console.log("server has been started on port " + PORT)
    );
  } catch (e) {
    console.log(e);
  }
};

start();
