const { Router } = require("express");
const usersController = require("../../controllers/usersControllers");
const router = Router();

// --- GET ALL USERS ---
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
 *      200:
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
 *      5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
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
 *    description: Login user into the system
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
 *       200:
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
 *                    type: object
 *                    properties:
 *                      token:
 *                        type: string
 *                        example: "some token"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 *
 */
router.post("/login", usersController.login);

module.exports = router;
