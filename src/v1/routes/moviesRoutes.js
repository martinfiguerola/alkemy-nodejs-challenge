const { Router } = require("express");
const movieController = require("../../controllers/moviesControllers");
const router = Router();

// --- GET ALL MOVIES ---
/**
 *
 *
 *
 *
 */
router.get("/", movieController.getAllMovies);

// --- GET ONE MOVIE ---
router.get("/:movieId", movieController.getOneMovie);

// --- CREATE NEW MOVIE ---
router.post("/", movieController.createNewMovie);

// --- UPDATE MOVIE ---
router.put("/:movieId", movieController.updateOneMovie);

// --- DELETE MOVIE ---
router.delete("/:movieId", movieController.deleteOneMovie);

module.exports = router;
