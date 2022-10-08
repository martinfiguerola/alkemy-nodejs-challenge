const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/index");

const tockenSign = async (user) => {
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
  tockenSign,
  checkToken,
};
