const { Character, Movie } = require("../models/index");
const { Op } = require("sequelize");

const getAllCharacters = async (req, res, next) => {
  const { name, age, weigth, movies } = req.query;
  try {
    // Buscar por nombre
    if (name) {
      const characters = await Character.findAll({
        where: {
          name: {
            [Op.iLike]: "%" + name + "%",
          },
        },
      });
      if (!characters.length) {
        return res.send({ msg: "Characters not found" });
      }
      return res.send({ status: "OK", data: characters });
    }

    // ------- POR EDAD --------
    else if (age) {
      const characters = await Character.findAll({
        attributes: ["image", "name"],
        where: {
          age,
        },
      });

      if (!characters.length) {
        return res.send({ msg: "Characters not found" });
      }
      return res.send({ status: "OK", data: characters });
    }

    // ------- POR PESO --------
    else if (weigth) {
      const characters = await Character.findAll({
        attributes: ["image", "name"],
        where: {
          weigth,
        },
      });

      if (!characters.length) {
        return res.send({ msg: "Characters not found" });
      }
      return res.send({ status: "OK", data: characters });
    }

    // ------- POR PELICULA ASOCIADA --------
    else if (movies) {
      console.log(movies);
      const characters = await Character.findAll({
        attributes: ["image", "name"],
        include: {
          model: Movie,
          attributes: ["title"],
          where: {
            id: movies,
          },
          through: {
            attributes: [],
          },
        },
      });

      if (!characters.length) {
        return res.send({ msg: "Characters not found" });
      }
      return res.send({ status: "OK", data: characters });
    }

    // ------- SIN FILTRO --------
    else {
      const characters = await Character.findAll({
        attributes: ["image", "name"],
      });
      if (!characters.length) {
        return res.send({ msg: "No characters created yet" });
      }
      return res.send({ status: "OK", data: characters });
    }
  } catch (error) {
    next(error);
  }
};

const getOneCharacter = async (req, res, next) => {
  // sabemos que vamos a recibir un id
  const { characterId } = req.params;
  try {
    // hay que buscar ese character por el id en la base de datos
    const character = await Character.findAll({
      where: {
        id: characterId,
      },
      include: {
        model: Movie,
        attributes: ["title"],
        through: {
          attributes: [],
        },
      },
    });
    // si no hay nada significa que el character no existe
    if (character.length === 0) {
      return res.send({ msg: "Character does not exist" });
    }
    // Y si hay algo sig que si existe, entonces retornamos el character con todos los atributos
    // y peliculas asociadas
    return res.send({ status: "Ok", data: character });
  } catch (error) {
    next(error);
  }
};

const createNewCharacter = async (req, res, next) => {
  const { body } = req;
  try {
    if (
      !body.image ||
      !body.name ||
      !body.movies ||
      !body.age ||
      !body.weigth
    ) {
      return res.send({ msg: "Complete all of inputs" });
    }
    const [newCharacter, created] = await Character.findOrCreate({
      where: {
        image: body.image,
        name: body.name,
        age: body.age,
        weigth: body.weigth,
        history: body.history,
      },
    });
    //console.log(created);
    //console.log(newCharacter.toJSON());
    // Si created es false sig que no lo creo porque ya existe un elemento
    if (created === false) return res.send({ msg: "Character already exists" });
    // Si created es true significa que lo creo, entonces seteamos las peliculas y devolvemos todo
    await newCharacter.setMovies(body.movies);
    return res.send({ status: "OK", data: newCharacter });
  } catch (error) {
    next(error);
  }
};

const updateOneCharacter = async (req, res, next) => {
  const { characterId } = req.params;
  const { body } = req;
  try {
    // recibimos el body y verificamos que nos pasen algo sino no se puede actualizar
    if (JSON.stringify(body) == "{}") {
      return res.send({ msg: "Enter the data you want to update" });
    }
    // BUSCAMOS EN LA BASE DE DATOS SI EL USUARIO QUE QUIEREN EDITAR EXISTE
    const character = await Character.findByPk(characterId);
    // SI CHARACTER ES NULL DEVOLVEMOS UN MENSAJE DE ERROR
    if (!character) return res.send({ msg: "Character does not exist" });
    // SI TIENE ALGO LO ACTUALIZAMOS Y RETORAMOS UN MENSAJE OK
    await Character.update(body, {
      where: {
        id: characterId,
      },
    });
    return res.send({ msg: "Character updated successfully" });
  } catch (error) {
    next(error);
  }
};

const deleteOneCharacter = async (req, res, next) => {
  const { characterId } = req.params;
  try {
    console.log(characterId);
    // VERIFICAR SI EXISTE ESTE CHARACTER
    const character = await Character.findByPk(characterId);
    // SI NO ESTA
    if (!character) return res.send({ msg: "Character does not exist" });
    // SI ESTA
    await Character.destroy({
      where: { id: characterId },
    });
    return res.send({ msg: "Character removed successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCharacters,
  getOneCharacter,
  createNewCharacter,
  updateOneCharacter,
  deleteOneCharacter,
};
