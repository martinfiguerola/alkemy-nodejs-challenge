const { Router } = require("express");
const usersController = require("../../controllers/usersControllers");
const router = Router();

// --- GET ALL USERS ---
/**
 * @swagger
 * /api/v1/auth/all:
 *  get:
 *    tags:
 *      - user
 *    summary: Get all users
 *    responses:
 *       '200':
 *          description: OK
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: "#/components/schemas/user"
 *
 *
 */
router.get("/all", usersController.getAllUsers);

// --- REGISTER ---
/**
 * @swagger
 * /api/v1/auth/register:
 *  post:
 *    tags:
 *      - user
 *    summary: Register
 *    description: Create an account
 *    requestBody:
 *      description: Created user object
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: alan@email.com
 *              password:
 *                type: text
 *                default: alan12345
 *              name:
 *                type: string
 *                default: Alan Key
 *    responses:
 *       '200':
 *          description: OK
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: "#/components/schemas/user"
 *
 *
 */
router.post("/register", usersController.register);

// --- LOGIN ---
/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    tags:
 *      - user
 *    summary: Log in
 *    description: text
 *    requestBody:
 *      description: user object
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: alan@email.com
 *              password:
 *                type: text
 *                default: alan12345
 *    responses:
 *       '200':
 *          description: OK
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                    type: array
 *                    items:
 *                      $ref: "#/components/schemas/user"
 *                 token:
 *                    type: string
 *                    example:
 *                      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFjZTM0ZWZiLTliMjItNDAxMy05ZGJhLTNiMTMzNDcyZWYyYiIsImlhdCI6MTY2NTc5ODI5MiwiZXhwIjoxNjY1ODA1NDkyfQ.os-zLAabFiQjklBRzLf_WwhzWK_V4y36GVvU
 *
 *
 */
router.post("/login", usersController.login);

module.exports = router;
