import express, { Router } from "express";

import {
  SaveMovieController,
  UnsaveMovieController,
  GetSavedMovies,
} from "../controllers/movie";

export const router: Router = express.Router();

router.post("/movie/save/:userId", SaveMovieController);
router.post("/movie/unsave/:userId", UnsaveMovieController);
router.get("/movies/saved/:userId", GetSavedMovies);
