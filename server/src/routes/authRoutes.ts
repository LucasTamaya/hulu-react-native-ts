import express, { Router } from "express";

import {
  LoginController,
  RegisterController,
  UpdatePasswordController,
} from "../controllers/auth";

export const router: Router = express.Router();

router.post("/login", LoginController);
router.post("/register", RegisterController);
router.post("/update/password/:userId", UpdatePasswordController);
