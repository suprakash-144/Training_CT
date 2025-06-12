import { Router } from "express";
import {
  createUser,
  GetAllTeam,
  GetAllTeamwithFilters,
  GetaTeammember,
  handleRefreshToken,
  loginUserCtrl,
  logoutUser,
  SignupUser,
} from "../Controller/auth";
import { authMiddleware } from "../Middlewares/authmiddleware";
import {
  loginValidation,
  signupValidation,
} from "../Middlewares/authschemavalidator";

const router = Router();

/**
 * @openapi
 * /team/register:
 *   post:
 *     tags:
 *       - Team
 *     summary: Signup for the Team
 *     description: Signup for the Team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - designation
 *             properties:
 *               name:
 *                 type: string
 *                 example: Suprakash
 *               email:
 *                 type: string
 *                 example: admin123@gmail.com
 *               password:
 *                 type: string
 *                 example: admin123
 *               designation:
 *                 type: string
 *                 example: HR
 *     responses:
 *       201:
 *         description: Team member created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 token:
 *                   type: string
 *             example:
 *               name: Suprakash
 *               token: eyJhbGciOi...
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server error
 */
router.post("/register", signupValidation, SignupUser);
/**
 * @openapi
 * /team/login:
 *   post:
 *     tags:
 *       - Team
 *     summary: Login Team member
 *     description: Login Team member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: User login credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 token:
 *                   type: string
 *             example:
 *               name: Suprakash Gorai
 *               token: eyJhbGciOi...
 *       401:
 *         description: Invalid Credentials / Unauthorized
 *       500:
 *         description: Internal Server error
 */
router.post("/login", loginValidation, loginUserCtrl);
/**
 * @openapi
 * /team/refresh:
 *   get:
 *     tags:
 *       - Team
 *     summary: Get a refresh token
 *     description: Get a refresh token
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Refresh Token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *             example:
 *               accessToken: eyJhbGciOi...
 *       500:
 *         description: Internal server error
 */
router.get("/refresh", handleRefreshToken);
/**
 * @openapi
 * /team/logout:
 *   get:
 *     tags:
 *       - Team
 *     summary: Logout the team member
 *     description: Logout the team member
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Remove the Cookies
 *       500:
 *         description: Internal server error
 */
router.get("/logout", logoutUser);
/**
 * @openapi
 * /team/create:
 *   post:
 *     tags:
 *       - Team
 *     summary: Create a new team member
 *     description: Create a new team member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - designation
 *             properties:
 *               name:
 *                 type: string
 *                 example: Suprakash
 *               email:
 *                 type: string
 *                 example: admin123@gmail.com
 *               password:
 *                 type: string
 *                 example: admin123
 *               designation:
 *                 type: string
 *                 example: HR
 *     responses:
 *       201:
 *         description: Team member created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 name: Suprakash
 *                 email: admin123@gmail.com
 *                 designation: HR
 *                 _id: 67db0b367a29a823fd9c66ba
 *                 createdAt: 2025-03-19T18:21:42.741Z
 *                 updatedAt: 2025-03-19T18:21:42.741Z
 *                 __v: 0
 *       400:
 *         description: Bad Request / Validation Error
 *       409:
 *         description: User Already Exists
 *       500:
 *         description: Internal Server error
 */
router.post("/create", authMiddleware, signupValidation, createUser);

/**
 * @openapi
 * /team/:
 *   get:
 *     tags:
 *       - Team
 *     summary: Get all the Team Members
 *     description: Fetch all the Team Members from the Database
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of the Team Members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 example:
 *                   name: Suprakash
 *                   email: admin@gmail.com
 *                   designation: HR
 *                   _id: 67db0b367a29a823fd9c66ba
 *                   createdAt: 2025-03-19T18:21:42.741Z
 *                   updatedAt: 2025-03-19T18:21:42.741Z
 *                   __v: 0
 *       401:
 *         description: Forbidden / Unauthenticated
 *       500:
 *         description: Internal Server error
 */
router.get("/", authMiddleware, GetAllTeam);
router.get("/filter/", authMiddleware, GetAllTeamwithFilters);

/**
 * @openapi
 * /team/{id}:
 *   get:
 *     tags:
 *       - Team
 *     summary: Get the Team Member by ID
 *     description: Fetch a specific Team Member by their ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the team member
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 name: Suprakash
 *                 email: admin123@gmail.com
 *                 designation: HR
 *                 _id: 67db0b367a29a823fd9c66ba
 *                 createdAt: 2025-03-19T18:21:42.741Z
 *                 updatedAt: 2025-03-19T18:21:42.741Z
 *                 __v: 0
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authMiddleware, GetaTeammember);

export default router;
