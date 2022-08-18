import express, { Router } from "express";

import {
  SaveMovieController,
  UnsaveMovieController,
} from "../controllers/movie";

export const router: Router = express.Router();

router.post("/movie/save/:userId", SaveMovieController);
router.post("/movie/unsave/:userId", UnsaveMovieController);
