const express = require("express");
const {
  updatedUser,
  getaUser,
  getallUser,
  loginUserCtrl,
  createUser,
  deleteaUser,
} = require("../Controller/Auth");
const { authMiddleware } = require("../Middlewares/authmiddleware");
const router = express.Router();

/**
 * @openapi
 * '/register':
 *  post:
 *     tags:
 *     - Create user
 *     summary: Create a new user
 *     description: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             User:
 *              type: object
 *              required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *               - mobile
 *               - role
 *             properties:
 *               firstname:
 *                 type: string
 *                 default: "Suprakash"
 *               lastname:
 *                 type: string
 *                 default: "Gorai"
 *               email:
 *                 type: string
 *                 default: "admin123@gmail.com"
 *               password:
 *                 type: string
 *                 default: "admin123"
 *               mobile:
 *                 type: string
 *                 default: "945612876"
 *               role:
 *                 type: string
 *                 default: "SDE"
 *     responses:
 *       200:
 *         description: User created
 *         content:
 *          application/json:
 *           schema:
 *           example:
 *             "firstname": "Suprakash"
 *             "lastname": "Gorai"
 *             "email": "admin123@gmail.com"
 *             "mobile": "945612876"
 *             "role": "SDE"
 *             "_id": "67db0b367a29a823fd9c66ba"
 *             "createdAt": "2025-03-19T18:21:42.741Z"
 *             "updatedAt": "2025-03-19T18:21:42.741Z"
 *             "__v": 0
 *       500:
 *         description: Internal Server error
 *
 */
router.post("/register", createUser);

/**
 * @openapi
 * '/login':
 *  post:
 *    tags:
 *    - Login User
 *    summary: Login User
 *    description: Login User
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             User:
 *              type: object
 *              required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 default: "admin123@gmail.com"
 *               password:
 *                 type: string
 *                 default: "admin123"
 *
 *    responses:
 *       200:
 *         description: User login credentials
 *         content:
 *          application/json:
 *           schema:
 *           example:
 *             "firstname": "Suprakash"
 *             "lastname": "Gorai"
 *             "email": "admin123@gmail.com"
 *             "mobile": "945612876"
 *             "_id": "67db0b367a29a823fd9c66ba"
 *             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Y2RkMjBjZjMxYjJmNjEyZGUzZTJmZSIsImlhdCI6MTc0MjQwMjkyM30.VlQNuTwIiwqrhYfI7gFslnPuk6Vv3ozULZ8CVz1h5oc"
 *
 *       500:
 *         description: Internal Server error
 *
 *
 */
router.post("/login", loginUserCtrl);
/**
 * @swagger
 * /all-users:
 *   get:
 *     tags:
 *     - Get All Users
 *     summary: Get all Users
 *     description: Get all Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get("/all-users", authMiddleware, getallUser);

/**
 * @openapi
 * /{id}:
 *   get:
 *     tags:
 *     - Get update delete  User by ID
 *     summary: Get a user by id
 *     description: Get a user by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of the user
 *         required: true
 *     responses:
 *       200:
 *         description: User created
 *         content:
 *          application/json:
 *           schema:
 *           example:
 *             "firstname": "Suprakash"
 *             "lastname": "Gorai"
 *             "email": "admin123@gmail.com"
 *             "mobile": "945612876"
 *             "role": "SDE"
 *             "_id": "67db0b367a29a823fd9c66ba"
 *             "createdAt": "2025-03-19T18:21:42.741Z"
 *             "updatedAt": "2025-03-19T18:21:42.741Z"
 *             "__v": 0
 *       500:
 *         description: Internal Server error
 *
 *   put:
 *     tags:
 *     - Get update delete  User by ID
 *     summary: Edit the details of a user
 *     description: Edit the details of a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of the user
 *         required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              firstname:
 *                type: string
 *                default: Suprakash
 *              lastname:
 *                type: string
 *              email:
 *                type: string
 *
 *              mobile:
 *                type: number
 *              role:
 *                type: string
 *     responses:
 *       200:
 *         description: User created
 *         content:
 *          application/json:
 *           schema:
 *           example:
 *             "firstname": "Suprakash"
 *             "lastname": "Gorai"
 *             "email": "admin123@gmail.com"
 *             "mobile": "945612876"
 *             "role": "SDE"
 *             "_id": "67db0b367a29a823fd9c66ba"
 *             "createdAt": "2025-03-19T18:21:42.741Z"
 *             "updatedAt": "2025-03-19T18:21:42.741Z"
 *             "__v": 0
 *       500:
 *         description: Internal Server error
 *   delete:
 *     tags:
 *     - Get update delete  User by ID
 *     summary: delete a user by id
 *     description: delete a user by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of the user
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get("/:id", getaUser);
router.put("/:id", authMiddleware, updatedUser);
router.delete("/:id", authMiddleware, deleteaUser);

module.exports = router;
