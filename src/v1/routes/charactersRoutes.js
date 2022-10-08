const { Router } = require("express");
const characterController = require("../../controllers/charactersControllers");
const { checkAuth } = require("../../utils/middleware/auth");
const router = Router();

router.get("/", checkAuth, characterController.getAllCharacters);

router.get("/:characterId", characterController.getOneCharacter);

router.post("/", characterController.createNewCharacter);

router.put("/:characterId", characterController.updateOneCharacter);

router.delete("/:characterId", characterController.deleteOneCharacter);

module.exports = router;
