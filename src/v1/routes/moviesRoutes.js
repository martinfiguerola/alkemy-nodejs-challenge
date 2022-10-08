const { Router } = require("express");
const movieController = require("../../controllers/moviesControllers");
const router = Router();

router.get("/", movieController.getAllMovies);

router.get("/:movieId", movieController.getOneMovie);

router.post("/", movieController.createNewMovie);

router.put("/:movieId", movieController.updateOneMovie);

router.delete("/:movieId", movieController.deleteOneMovie);

module.exports = router;
