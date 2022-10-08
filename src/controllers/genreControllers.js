const { Genre } = require("../models");

const getAllGenre = async (req, res) => {
  const genres = await Genre.findAll({
    attributes: ["id", "name"],
  });
  return res.send({ status: "OK", data: genres });
};

const createNewGenre = async (req, res, next) => {
  const { name, image } = req.body;
  console.log(name);
  console.log(image);
  try {
    if (!name) return res.send({ msg: "Complete all of inputs" });
    const [newGenre, created] = await Genre.findOrCreate({
      where: {
        name,
        image,
      },
    });
    if (created === false) return res.send({ msg: "Genre already exists" });
    return res.send({ status: "OK", data: newGenre });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllGenre,
  createNewGenre,
};
