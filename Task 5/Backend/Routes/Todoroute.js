const express = require("express");

const { authMiddleware } = require("../Middlewares/authmiddleware");
const {
  CreateTodo,
  GetTodo,
  DeleteTodo,
  UpdateTodo,
} = require("../Controller/TodoController");
const {
  todoValidation,
  todoqueryValidation,
} = require("../Middlewares/todoschemavalidator");
const router = express.Router();

/**
 * @openapi
 * '/todo/createtodo':
 *  post:
 *     tags:
 *     - TODO
 *     summary: Create a new Todo item
 *     description: Create a new Todo item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             User:
 *              type: object
 *              required:
 *               - title
 *               - body
 *               - completion
 *             properties:
 *               title:
 *                 type: string
 *                 default: "First"
 *               body:
 *                 type: string
 *                 default: "Trying the path"
 *               completion:
 *                 type: boolean
 *                 default: "false"
 *     responses:
 *       200:
 *         description: Todo item created
 *         security:
 *          - bearerAuth: []
 *         content:
 *          application/json:
 *           schema:
 *           example:
 *             "title": "Fiest"
 *             "body": "Trying the path"
 *             "completion": "false"
 *             "by": "67dd9b9d602a99682a60ef5f"
 *             "_id": "67db0b367a29a823fd9c66ba"
 *             "createdAt": "2025-03-19T18:21:42.741Z"
 *             "updatedAt": "2025-03-19T18:21:42.741Z"
 *       500:
 *         description: Internal Server error
 *
 */
router.post("/createtodo", authMiddleware, todoValidation, CreateTodo);

/**
 * @openapi
 * /todo/:
 *   get:
 *     tags:
 *     - TODO
 *     summary: Get  the todos of a user
 *     description: Get all the todo items of a user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Todo is received
 *         content:
 *          application/json:
 *           schema:
 *           example:
 *             "title": "First todo"
 *             "body": "Test"
 *             "completion": "false"
 *             "by": "945612876"
 *             "createdAt": "2025-03-19T18:21:42.741Z"
 *             "updatedAt": "2025-03-19T18:21:42.741Z"
 *       403:
 *         description: Forbidden / Unauthenticated
 *       500:
 *         description: Internal Server error
 */

router.get("/", authMiddleware, todoqueryValidation, GetTodo);
/**
 * @openapi
 * /todo/{id}:
 *   put:
 *     tags:
 *     - TODO
 *     summary: Update the todo item
 *     description: Update the details of the todo item
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of the user
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             Todo:
 *              type: object
 *              required:
 *               - completion
 *             properties:
 *               completion:
 *                 type: boolean
 *                 default: "false"
 *     responses:
 *       200:
 *         description: Success
 *       403:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 *   delete:
 *     tags:
 *     - TODO
 *     summary: delete a Todo item by id
 *     description: delete a Todo item by id
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
 *       500:
 *         description: Internal server error
 *
 */
router.put("/:id", authMiddleware, UpdateTodo);
router.delete("/:id", authMiddleware, DeleteTodo);

module.exports = router;
