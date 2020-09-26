import "dotenv/config";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { errors } from "celebrate";
import "express-async-errors";

import AppError from "@app/errors/AppError";
import routes from "./routes";

import "@config/database";
import "@app/providers/CacheProvider";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errors());
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

export default app;
