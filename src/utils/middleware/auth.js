const { checkToken } = require("../helpers/generateTocken");

const checkAuth = async (req, res, next) => {
  //console.log(req.headers.authorization.split(" ").pop());
  try {
    if (!req.headers.authorization) {
      return res.status(500).send("You must log in");
    }
    const token = req.headers.authorization.split(" ").pop(); // Aca tenemos el tocken separado
    //console.log(token);
    // Ahora hay que verificarlo
    const tokenData = await checkToken(token); // esto puede devolver null / token decodificado
    //console.log(tokenData);
    if (!tokenData) return res.send({ msg: "Access denied " });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkAuth,
};
