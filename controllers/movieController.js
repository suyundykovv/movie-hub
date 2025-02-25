// controllers/movieController.js
import Movie from '../models/Movie.js';

export const createMovie = async (req, res, next) => {
  try {
    const newMovie = new Movie({ ...req.body, user: req.user.id });
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    next(error);
  }
};

export const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ user: req.user.id });
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

export const getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    next(error);
  }
};

export const updateMovie = async (req, res, next) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMovie);
  } catch (error) {
    next(error);
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movie deleted' });
  } catch (error) {
    next(error);
  }
};