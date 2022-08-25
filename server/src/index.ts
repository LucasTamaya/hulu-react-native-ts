require("dotenv").config();

import express, { Response } from "express";
import cors from "cors";

import { mdbConnexion } from "./config/mdbConnexion";
import { router as authRoutes } from "./routes/authRoutes";
import { router as movieRoutes } from "./routes/movieRoutes";

const PORT: string | number = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

mdbConnexion();

app.use(authRoutes);
app.use(movieRoutes);

app.get("/", (_, res: Response) => {
  return res.json({ message: "Hello world" });
});

app.listen(PORT, () => {
  console.log("server now running on port", PORT);
});
