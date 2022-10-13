const { Router } = require("express");
const charactersRouter = require("./charactersRoutes");
const moviesRouter = require("./moviesRoutes");
const usersRouter = require("./usersRoutes");
const genreRouter = require("./genreRoutes");
const { checkAuth } = require("../../utils/middleware/auth");
const router = Router();

router.use("/characters", checkAuth, charactersRouter);
router.use("/movies", checkAuth, moviesRouter);
router.use("/auth", usersRouter);
router.use("/genre", genreRouter);

module.exports = router;
