import express from "express";
import cors from "cors";

import { router as authRoutes } from "./routes/user";
import { router as movieRoutes } from "./routes/movie";

export const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors({ origin: "*" }));

  // définition des routes de mon app
  app.use(authRoutes);
  app.use(movieRoutes);

  return app;
};
