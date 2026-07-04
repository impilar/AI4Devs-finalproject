import express, { type Express } from "express";
import cors from "cors";
import { apiRouter } from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

export function createApp(): Express {
  const app = express();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
    }),
  );
  app.use(express.json());
  app.use("/api/v1", apiRouter);
  app.use(errorHandler);

  return app;
}
