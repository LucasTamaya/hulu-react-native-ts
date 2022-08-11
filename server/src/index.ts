require("dotenv").config();

import express, { Request, Response } from "express";
import cors from "cors";

import { mdbConnexion } from "./config/mdbConnexion";
import { router as authRoutes } from "./routes/authRoutes";
import { router as movieRoutes } from "./routes/movieRoutes";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

mdbConnexion();

app.use(authRoutes);
app.use(movieRoutes);

app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hello world" });
});

app.listen(PORT, () => {
  console.log("server now running on port", PORT);
});
