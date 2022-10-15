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
 *          200:
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                      example: OK
 *                    data:
 *                      type: object
 *                      example: all characters filtered or searched
 *          5XX:
 *            description: FAILED
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                      example: FAILED
 *                    data:
 *                      type: object
 *                      properties:
 *                        error:
 *                          type: string
 *                          example: "Some error message"
 *    security:
 *      - bearerAuth: []
 */

router.get("/", characterController.getAllCharacters);

// --- GET ONE CHARACTERS ---
/**
 *  @swagger
 *    /api/v1/characters/{characterId}:
 *      get:
 *        tags:
 *          - character
 *        summary: Get character id
 *        description: get movie by params (characterId)
 *        parameters:
 *          - name: characterId
 *            in: path
 *            description: character ID
 *            required: true
 *            schema:
 *              type: string
 *              format: uuid
 *        responses:
 *          200:
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                      example: OK
 *                    data:
 *                      type: array
 *                      items:
 *                        $ref: "#/components/schemas/character"
 *          5XX:
 *            description: FAILED
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                      example: FAILED
 *                    data:
 *                      type: object
 *                      properties:
 *                        error:
 *                          type: string
 *                          example: "Some error message"
 *        security:
 *          - bearerAuth: []
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
 *      summary: Create new character
 *      description: Add a new character to the DB
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
 *                - movies
 *              properties:
 *                image:
 *                  type: string
 *                  default: https://i.pinimg.com/736x/59/ee/1c/59ee1ceea702597255e47a823c30ee08.jpg
 *                name:
 *                  type: string
 *                  default: Jane Porter
 *                age:
 *                  type: integer
 *                  default: 27
 *                weigth:
 *                  type: integer
 *                  default: 55
 *                history:
 *                  type: string
 *                  default: the character history
 *                movies:
 *                  type: array
 *                  default: [4]
 *      responses:
 *          200:
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                      example: OK
 *                    data:
 *                      type: array
 *                      items:
 *                        $ref: "#/components/schemas/character"
 *          5XX:
 *            description: FAILED
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                      example: FAILED
 *                    data:
 *                      type: object
 *                      properties:
 *                        error:
 *                          type: string
 *                          example: "Some error message"
 *      security:
 *          - bearerAuth: []
 *
 *
 */
router.post("/", characterController.createNewCharacter);

// --- UPDATE CHARACTER  ---
/**
 *  @swagger
 *    /api/v1/characters/{characterId}:
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
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                      example: OK
 *                    data:
 *                      type: object
 *                      properties:
 *                        msg:
 *                          type: string
 *                          example: "Some success message"
 *          5XX:
 *            description: FAILED
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                      example: FAILED
 *                    data:
 *                      type: object
 *                      properties:
 *                        error:
 *                          type: string
 *                          example: "Some error message"
 *        security:
 *          - bearerAuth: []
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
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                      example: OK
 *                    data:
 *                      type: object
 *                      properties:
 *                        msg:
 *                          type: string
 *                          example: "Some success message"
 *          5XX:
 *            description: FAILED
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                      example: FAILED
 *                    data:
 *                      type: object
 *                      properties:
 *                        error:
 *                          type: string
 *                          example: "Some error message"
 *        security:
 *          - bearerAuth: []
 */
router.delete("/:characterId", characterController.deleteOneCharacter);

module.exports = router;
