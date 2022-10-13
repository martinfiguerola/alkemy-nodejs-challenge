const { Genre } = require("../models");
const genres = require("../data/genres");

const getAllGenre = async (req, res) => {
  const genres = await Genre.findAll({
    attributes: ["id", "name"],
  });
  return res.send({ status: "OK", data: genres });
};

const createNewGenre = async (req, res, next) => {
  try {
    const db = await Genre.findAll();
    if (db.length === 0) {
      genres.forEach((genre) => {
        Genre.create(genre);
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllGenre,
  createNewGenre,
};
