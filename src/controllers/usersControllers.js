const { User } = require("../models/index");
const { encrypt, compare } = require("../utils/helpers/handlerBcrypt");
const { tokenSign } = require("../utils/helpers/generateToken");
const expressionEmail = require("../utils/helpers/expressionEmail");
const expressionPassword = require("../utils/helpers/expressionPassword");
const emailer = require("../utils/helpers/emailer");

const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.send({ status: "OK", data: users });
};

const register = async (req, res, next) => {
  const { body } = req;
  try {
    // Validamos los campos que nos pasan

    if (!expressionEmail.test(body.email)) {
      return res.status(403).send({ msg: "Enter valid email" });
    }
    if (!expressionPassword.test(body.password)) {
      return res.status(403).send({
        msg: "Password must have minimum eight characters, at least one letter and one number",
      });
    }
    if (body.name.length < 4) {
      return res
        .status(403)
        .send({ msg: "Name must have more than 4 characters" });
    }

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
      //emailer(newUser);
      return res.send({ status: "OK", data: createdWorkout });
    } else {
      // si encuentra al usuario no se crea nada
      return res.status(401).json({ message: "User already exists" });
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
    const tokenSession = await tokenSign(user);
    // Si es true significa que la contraseña es la correcta
    // devolvemos el usuario y el tocken
    return res.send({ status: "OK", data: user, token: tokenSession });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  register,
  login,
};
