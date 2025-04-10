const express = require("express");
const {
  loginUserCtrl,
  createUser,
  handleRefreshToken,
  logout,
} = require("../Controller/Auth");
const {
  signupValidation,
  loginValidation,
} = require("../Middlewares/authschemavalidator");
const router = express.Router();

/**
 * @openapi
 * '/register':
 *  post:
 *     tags:
 *     -  User
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
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 default: "Suprakash"
 *               email:
 *                 type: string
 *                 default: "admin123@gmail.com"
 *               password:
 *                 type: string
 *                 default: "admin123"
 *     responses:
 *       200:
 *         description: User created
 *         content:
 *          application/json:
 *           schema:
 *           example:
 *             "name": "Suprakash"
 *             "email": "admin123@gmail.com"
 *             "_id": "67db0b367a29a823fd9c66ba"
 *             "createdAt": "2025-03-19T18:21:42.741Z"
 *             "updatedAt": "2025-03-19T18:21:42.741Z"
 *             "__v": 0
 *       500:
 *         description: Internal Server error
 *
 */
router.post("/register", signupValidation, createUser);
/**
 * @openapi
 * '/login':
 *  post:
 *    tags:
 *    - User
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
 *                 default: "admin@gmail.com"
 *               password:
 *                 type: string
 *                 default: "123456"
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
router.post("/login", loginValidation, loginUserCtrl);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);

module.exports = router;
