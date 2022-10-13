const { Router } = require("express");
const genreController = require("../../controllers/genreControllers");
const router = Router();

router.get("/", genreController.getAllGenre);

module.exports = router;
