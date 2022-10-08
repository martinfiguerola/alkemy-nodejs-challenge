const { checkToken } = require("../helpers/generateTocken");

const checkAuth = async (req, res, next) => {
  //console.log(req.headers.authorization.split(" ").pop());
  try {
    const token = req.headers.authorization.split(" ").pop(); // Aca tenemos el tocken separado
    //console.log(token);
    // Ahora hay que verificarlo
    const tokenData = await checkToken(token); // esto puede devolver null / token decodificado
    console.log(tokenData);
    if (!tokenData) return res.send({ msg: "Access denied " });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkAuth,
};
