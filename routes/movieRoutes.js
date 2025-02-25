// routes/movieRoutes.js
import express from 'express';
import {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie
} from '../controllers/movieController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createMovie)
  .get(getMovies);

router.route('/:id')
  .get(getMovieById)
  .put(protect, updateMovie)
  .delete(protect, admin, deleteMovie);

export default router;