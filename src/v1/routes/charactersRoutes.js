const { Router } = require("express");
const characterController = require("../../controllers/charactersControllers");
const router = Router();

// --- GET ALL CHARACTERS ---
/**
 * @swagger
 * /api/v1/characters:
 *  get:
 *    tags:
 *      - character
 *    summary: Get all characters
 *    description: you can search or filter by one of the options
 *    parameters:
 *      - name: name
 *        in: query
 *        description: Search by name
 *        schema:
 *          type: string
 *      - name: age
 *        in: query
 *        description: Filter by age
 *        schema:
 *          type: integer
 *      - name: weigth
 *        in: query
 *        description: Filter by weight
 *        schema:
 *          type: integer
 *      - name: movies
 *        in: query
 *        description: Filter by movieId
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: successful operation
 *    security:
 *      - bearerAuth: []
 *
 *
 */
router.get("/", characterController.getAllCharacters);

// --- GET ONE CHARACTERS ---
/**
 *@swagger
 *  /api/v1/characters/{characterId}:
 *    get:
 *      tags:
 *        - character
 *      summary: Get character by id
 *      parameters:
 *        - name: characterId
 *          in: path
 *          description: Character ID
 *          required: true
 *          schema:
 *            type: string
 *            format: uuid
 *      responses:
 *        200:
 *          description: successful operation
 *      security:
 *      - bearerAuth: []
 *
 *
 *
 */
router.get("/:characterId", characterController.getOneCharacter);

// --- CREATE NEW CHARACTER  ---
/**
 * @swagger
 *
 *  /api/v1/characters:
 *    post:
 *      tags:
 *        - character
 *      summary: Create character
 *      description: This can only be done by the logged in user
 *      requestBody:
 *        description: Created character object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - image
 *                - name
 *                - age
 *                - image
 *                - weigth
 *              properties:
 *                image:
 *                  type: string
 *                  default: https://i.blogs.es/73b07d/tarzan-3/450_1000.webp
 *                name:
 *                  type: string
 *                  default: Tarzan
 *                age:
 *                  type: integer
 *                  default: 30
 *                weigth:
 *                  type: integer
 *                  default: 50
 *                history:
 *                  type: string
 *                  default: the character history
 *                movies:
 *                  type: array
 *                  default: [4]
 *      responses:
 *        200:
 *          description: returns the character that was created
 *        5XX:
 *          description: validation error
 *      security:
 *        - bearerAuth: []
 *
 *
 */
router.post("/", characterController.createNewCharacter);

// --- UPDATE CHARACTER  ---
/**
 *  @swagger
 *    /api/v1/characterS/{characterId}:
 *      put:
 *        tags:
 *          - character
 *        summary: Update character
 *        description: Update an existing pet by Id
 *        parameters:
 *          - name: characterId
 *            in: path
 *            description: Character ID
 *            required: true
 *            schema:
 *              type: string
 *              format: uuid
 *        requestBody:
 *          description: Update an existent character in the DB
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  age:
 *                    type: integer
 *                    default: 10
 *                  history:
 *                    type: integer
 *                    default: update character history
 *        responses:
 *          200:
 *            description: Character updated successfully
 *          5XX:
 *            description: validation error
 *        security:
 *          - bearerAuth: []
 *
 *
 *
 *
 */
router.put("/:characterId", characterController.updateOneCharacter);

// --- DELETE ---
/**
 *  @swagger
 *    /api/v1/characters/{characterId}:
 *      delete:
 *        tags:
 *          - character
 *        summary: Deletes a pet
 *        description: delete a pet
 *        parameters:
 *          - name: characterId
 *            in: path
 *            description: Character ID
 *            required: true
 *            schema:
 *              type: string
 *              format: uuid
 *        responses:
 *          200:
 *            description: Character removed successfully
 *          5XX:
 *            description: validation error
 *        security:
 *          - bearerAuth: []
 *
 */
router.delete("/:characterId", characterController.deleteOneCharacter);

module.exports = router;
