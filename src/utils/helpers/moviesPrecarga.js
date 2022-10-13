const movies = require("../../data/movies");
const { Movie } = require("../../models/index");

const createBeforeMovie = async (req, res, next) => {
  try {
    const db = await Movie.findAll();
    if (db.length === 0) {
      movies.forEach((movie) => {
        Movie.create(movie);
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBeforeMovie,
};
