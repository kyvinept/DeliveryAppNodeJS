import express from "express";
import { config } from "dotenv";
import sequelize from "./db";
import cors from "cors";
import routers from "./routers";
import { ErrorHandlingMiddleware } from "./middleware";

const models = require("./models/db_models");

config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", routers);
app.use(ErrorHandlingMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () =>
      console.log("server has been started on port " + PORT)
    );
  } catch (e) {
    console.log(e);
  }
};

start();
