import express from "express";
import "dotenv/config";
import sequelize from "./src/database/db";
import cors from "cors";
import routers from "./src/routers";
import { ErrorHandlingMiddleware } from "./src/middleware";
import "./src/models/db_models";

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
