const bcrypt = require("bcryptjs");

// --- Encriptar contraseña
const encrypt = async (textPlain) => {
  //  (1223)
  const hash = await bcrypt.hash(textPlain, 10); // --> 15d5df5ssd6556sd
  return hash;
};

// Comparamos las contraseñas
const compare = async (passwordPlain, hashPassword) => {
  return await bcrypt.compare(passwordPlain, hashPassword);
};

module.exports = {
  encrypt,
  compare,
};
