require("dotenv").config();

import express, { Response } from "express";
import cors from "cors";

import { mdbConnexion } from "./config/mdbConnexion";
import { router as authRoutes } from "./routes/auth";
import { router as movieRoutes } from "./routes/movie";

const PORT: string | number = process.env.PORT || 4000;

const app = express();

// mdbConnexion();

app.use(express.json());
app.use(cors({ origin: "*" }));

// définition des routes de mon app
app.use(authRoutes);
app.use(movieRoutes);

// app.get("/", (_, res: Response) => {
//   return res.json({ message: "Hello world" });
// });

app.listen(PORT, () => {
  mdbConnexion();
  console.log("server now running on port", PORT);
});

export default app;
