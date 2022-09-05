import express, { Router } from "express";

import {
  SaveMovieController,
  UnsaveMovieController,
  GetSavedMoviesController,
} from "../controllers/movie";

export const router: Router = express.Router();

router.post("/save-movie/:userId", SaveMovieController);
router.post("/unsave-movie/:userId", UnsaveMovieController);
router.get("/saved-movies/:userId", GetSavedMoviesController);
