const { Router } = require("express");
const charactersRouter = require("./charactersRoutes");
const moviesRouter = require("./moviesRoutes");
const usersRouter = require("./usersRoutes");
const genreRouter = require("./genreRoutes");
const router = Router();

router.use("/characters", charactersRouter);
router.use("/movies", moviesRouter);
router.use("/auth", usersRouter);
router.use("/genre", genreRouter);

module.exports = router;
