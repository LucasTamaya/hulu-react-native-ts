require("dotenv").config();

import express from "express";
import cors from "cors";

import { mdbConnexion } from "./src/config/mdbConnexion";
import { router as authRoutes } from "./src/routes/authRoutes";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cors());

mdbConnexion();

app.use(authRoutes);

app.get("/", (req: any, res: any) => {
  return res.json({ message: "Hello world" });
});

app.listen(PORT, () => {
  console.log("server now running on port", PORT);
});
