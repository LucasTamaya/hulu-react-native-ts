import express, { Router } from "express";

import {
  SavedMovieIdsController,
  SaveMovieController,
  UnsaveMovieController,
} from "../controllers/movie";

export const router: Router = express.Router();

router.get("/movies/saved/:userId", SavedMovieIdsController);
router.post("/movie/save/:userId", SaveMovieController);
router.post("/movie/unsave/:userId", UnsaveMovieController);
