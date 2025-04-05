import express, { Express } from "express";
import logger from "morgan";
import connectDb from "./utils/config/db.config";
import authRouter from "./routes/auth.routes";
import { errorHandler } from "./middlewares/errors.handler";

const app: Express = express();

app.use(logger("combined"));
app.set("port", process.env.PORT || 7000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use("/api/v1/auth", authRouter);

// Middlewares

app.use(errorHandler);

(() => {
  connectDb()
    .then(() => {
      console.log("Database connection successful");

      app.listen(app.get("port"), () => {
        console.log(`Server is running on port ${app.get("port")}`);
      });
    })
    .catch((e) => {
      console.log(`An error occurred connecting to database: ${e}`);
    });
})();
