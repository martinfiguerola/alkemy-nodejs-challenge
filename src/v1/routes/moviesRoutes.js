const { Router } = require("express");
const movieController = require("../../controllers/moviesControllers");
const router = Router();

// --- GET ALL MOVIES ---
/**
 *  @swagger
 *    /api/v1/movies:
 *      get:
 *        tags:
 *        - movie
 *        summary: Get all movies
 *        description: only one filter at a time
 *        parameters:
 *          - name: name
 *            in: query
 *            description: Search by name
 *            schema:
 *              type: string
 *          - name: genre
 *            in: query
 *            description: Filter by genre
 *            schema:
 *              type: integer
 *          - name: order
 *            in: query
 *            description: Sort ASC or DESC
 *            schema:
 *              type: string
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
 *                      example: all movies filtered or searched
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
router.get("/", movieController.getAllMovies);

// --- GET ONE MOVIE ---
/**
 *  @swagger
 *    /api/v1/movies/{movieId}:
 *      get:
 *        tags:
 *          - movie
 *        summary: Get movie id
 *        description: get movie by params (movieId)
 *        parameters:
 *          - name: movieId
 *            in: path
 *            description: movieId
 *            required: true
 *            schema:
 *              type: integer
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
 *                        $ref: "#/components/schemas/movie"
 *
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
router.get("/:movieId", movieController.getOneMovie);

// --- CREATE NEW MOVIE ---
/**
 *  @swagger
 *    /api/v1/movies:
 *      post:
 *        tags:
 *          - movie
 *        summary: Create new movie
 *        description: Add a new movie to the DB
 *        requestBody:
 *          description: Created user object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/movie'
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
 *                        $ref: "#/components/schemas/movie"
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
router.post("/", movieController.createNewMovie);

// --- UPDATE MOVIE ---
/**
 *  @swagger
 *    /api/v1/movies/{movieId}:
 *      put:
 *        tags:
 *          - movie
 *        summary: Update movie
 *        description: Update movie by id
 *        parameters:
 *          - name: movieId
 *            in: path
 *            description: Movie ID
 *            required: true
 *            schema:
 *              type: integer
 *        requestBody:
 *          description: Values ​​you want to update
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  title:
 *                    type: string
 *                    default: Enredados Disney
 *                  quallification:
 *                    type: integer
 *                    default: 5
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
 *
 */
router.put("/:movieId", movieController.updateOneMovie);

// --- DELETE MOVIE ---
/**
 *  @swagger
 *  /api/v1/movies/{movieId}:
 *    delete:
 *      tags:
 *        - movie
 *      summary: Delete movie
 *      description: Delete movie by id
 *      parameters:
 *        - name: movieId
 *          in: path
 *          description: movie ID
 *          required: true
 *          schema:
 *            type: integer
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
 *      security:
 *        - bearerAuth: []
 *
 */
router.delete("/:movieId", movieController.deleteOneMovie);

module.exports = router;
