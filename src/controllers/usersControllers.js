const { User } = require("../models/index");
const { encrypt, compare } = require("../utils/helpers/handlerBcrypt");
const { tockenSign } = require("../utils/helpers/generateTocken");
// --- Exprecion de Email ---
const expressionEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.send({ status: "OK", data: users });
};

const register = async (req, res, next) => {
  const { body } = req;
  try {
    // Validamos los campos que nos pasan
    if (
      !expressionEmail.test(body.email) ||
      !body.password ||
      !body.name.length >= 4
    ) {
      // Si hay algun error con algun campo de creacion devuelve un mensj con el error
      return res.send({ msg: "Complete all of inputs" });
    } else {
      // Sino sigue el procedimiento
      // Buscamos en la base de datos si el usuario ya existe
      const user = await User.findOne({
        where: {
          email: body.email,
        },
      });
      if (!user) {
        // si no encuentra al usuario se lo crea
        const passwordHash = await encrypt(body.password); // Encriptamos la contraseña
        const newUser = {
          email: body.email,
          password: passwordHash,
          name: body.name,
        };
        const createdWorkout = await User.create(newUser);
        return res.send({ status: "OK", data: createdWorkout });
      } else {
        // si encuentra al usuario no se crea nada
        return res.status(401).json({ message: "User already exists" });
      }
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Validamos que sean correctos los datos que nos pasan

    // --- Validamos el email --
    const user = await User.findOne({
      where: {
        email,
      },
    });
    // Si no hay user significa que no existe el email
    if (!user) return res.send({ msg: "incorrect e-mail address or password" });

    // Si user tiene algo sigue el proceso --->

    // --- Validamos la contraseña ---
    const checkPassword = await compare(password, user.password);

    // Si no es true significa que la contraseña es incorrecta
    if (!checkPassword) {
      return res.send({ msg: "incorrect e-mail address or password" });
    }
    const tockenSession = await tockenSign(user);
    // Si es true significa que la contraseña es la correcta
    // devolvemos el usuario y el tocken
    return res.send({ status: "OK", data: user, tocken: tockenSession });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  register,
  login,
};
