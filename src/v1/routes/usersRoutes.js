const { Router } = require("express");
const usersController = require("../../controllers/usersControllers");
const router = Router();

router.get("/all", usersController.getAllUsers);
router.post("/register", usersController.register);
router.post("/login", usersController.login);

module.exports = router;
