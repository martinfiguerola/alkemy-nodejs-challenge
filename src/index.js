// Api --> nodemon, express, morgan, dotenv, sequelize, pg pg-hstore
const express = require("express");
const morgan = require("morgan");
const { conn } = require("./models/index");
const v1Router = require("./v1/routes/indexRoutes");
// Importamos el modelo los elementos que vamos a precargar
const { createNewGenre } = require("./controllers/genreControllers");
const { createBeforeMovie } = require("./utils/helpers/moviesPrecarga");
const app = express();
const { PORT } = require("./utils/config/index");

// Aca vamos a setear todos nuestros headers
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));

// Aca vamos a setear todos nuestras rutas
app.use("/api/v1", v1Router);

// Aca vamos a setear todos nuestro middleware de control de errores
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  return res.status(status).send(message);
});

// Aca ponemos a escuchar a nuestro servidor en el puerto correspondiente
conn
  .sync({ force: false })
  .then(() => {
    console.log("Connection has been established successfully.");
    app.listen(PORT, () => {
      console.log(`🚀 API is listening on port ${PORT}`);
    });
    // HACEMOS LA PRECARGA
    createNewGenre();
    createBeforeMovie();
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
