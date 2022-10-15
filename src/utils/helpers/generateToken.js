const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/index");

const tokenSign = async (user) => {
  return jwt.sign(
    {
      id: user.id,
    },
    jwtSecret,
    {
      expiresIn: "2h",
    }
  );
};

const checkToken = async (token) => {
  //console.log(token);
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    return null;
  }
};

module.exports = {
  tokenSign,
  checkToken,
};
