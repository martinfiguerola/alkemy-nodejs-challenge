const { Movie, Character, Genre } = require("../models");
const { Op } = require("sequelize");

const getAllMovies = async (req, res, next) => {
  const { name, genre, order } = req.query;
  try {
    // BUSCAR POR TITULO --> title

    if (name) {
      const movie = await Movie.findAll({
        attributes: ["image", "title", "createdAt"],
        where: {
          title: {
            [Op.iLike]: "%" + name + "%",
          },
        },
      });
      if (movie.length === 0)
        return res.send({
          status: "FAILED",
          data: { error: "Movie not found" },
        });
      return res.send({ status: "OK", data: movie });
    }

    // FILTRAR POR GENERO --> GENRE-ID
    else if (genre) {
      const movie = await Movie.findAll({
        attributes: ["image", "title", "createdAt"],
        where: {
          genreId: genre,
        },
      });
      if (movie.length === 0)
        return res.send({
          status: "FAILED",
          data: { error: "Movie not found" },
        });
      return res.send({ status: "OK", data: movie });
    }

    // ORDENAMIENTO - ASC / DESC
    else if (order) {
      const movie = await Movie.findAll({
        attributes: ["image", "title", "createdAt"],
        order: [["createdAt", order]],
      });
      return res.send({ status: "OK", data: movie });
    }

    // SINO HAY QUERYS DEVOLVEMOS TODO
    else {
      const movies = await Movie.findAll({
        attributes: ["image", "title", "createdAt"],
      });
      if (!movies.length) {
        return res.send({
          status: "FAILED",
          data: { error: "No movies created yet" },
        });
      }
      return res.send({ status: "OK", data: movies });
    }
  } catch (error) {
    next(error);
  }
};

const getOneMovie = async (req, res, next) => {
  const { movieId } = req.params;

  try {
    //vamos a tomar el id que nos pasan y buscamos el personaje
    const movie = await Movie.findAll({
      where: {
        id: movieId,
      },
      include: {
        model: Character,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    // si no existe devolemos un mensj correspondiente
    if (movie.length === 0)
      return res.send({ status: "FAILED", data: { error: "Movie not found" } });
    // y si existe lo devolvemos con todas sus propiedades y los personajes asociados
    return res.send({ status: "OK", data: movie });
  } catch (error) {
    next(error);
  }
};

const createNewMovie = async (req, res, next) => {
  const { body } = req;
  try {
    if (!body.image || !body.title || !body.quallification || !body.genreId) {
      return res.send({
        status: "FAILED",
        data: { error: "Complete all of inputs" },
      });
    }

    const [newMovie, created] = await Movie.findOrCreate({
      where: {
        image: body.image,
        title: body.title,
        quallification: body.quallification,
        genreId: body.genreId,
      },
    });
    //console.log(created);
    //console.log(newMovie.toJSON());
    if (created === false)
      return res.send({
        status: "FAILED",
        data: { error: "Movie already exists" },
      });
    return res.send({ status: "OK", data: newMovie });
  } catch (error) {
    next(error);
  }
};

const updateOneMovie = async (req, res, next) => {
  const {
    body,
    params: { movieId },
  } = req;
  //console.log(movieId);
  //console.log(body);
  try {
    // recibimos el body y verificamos que nos pasen algo sino no se puede actualizar
    if (JSON.stringify(body) == "{}") {
      return res.send({
        status: "FAILED",
        data: { error: "Enter the data you want to update" },
      });
    }

    // recibimos el id y buscamos el personaje
    const movie = await Movie.findByPk(movieId);

    // si no existe el personaje enviamos un mensaje correspondiente
    if (!movie)
      return res.send({
        status: "FAILED",
        data: { error: "Movie does not exist" },
      });

    // y si existe lo actualizamos segun los datos pasados
    await Movie.update(body, {
      where: {
        id: movieId,
      },
    });

    return res.send({
      status: "0K",
      data: { msg: "Character updated successfully" },
    });
  } catch (error) {
    next(error);
  }
};

const deleteOneMovie = async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const movie = await Movie.findByPk(movieId);
    if (!movie)
      return res.send({
        status: "FAILED",
        data: { error: "Movie does not exist" },
      });
    await Movie.destroy({
      where: {
        id: movieId,
      },
    });
    return res.send({
      status: "0K",
      data: { msg: "Character removed successfully" },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMovies,
  getOneMovie,
  createNewMovie,
  updateOneMovie,
  deleteOneMovie,
};
