import { Router } from "express";
import { authMiddleware } from "../Middlewares/authmiddleware";
import {
  CreateTask,
  DeleteTask,
  GetTask,
  GetTaskById,
  GetTaskbyProdId,
  UpdateTask,
} from "../Controller/TaskController";
import {
  taskUpdateValidation,
  taskValidation,
} from "../Middlewares/taskschemavalidator";
import { IsmemberOfProject } from "../Middlewares/Authorization";

const router = Router();
/**
 * @openapi
 * /tasks/create:
 *   post:
 *     tags:
 *       - Task
 *     summary: Create a new Task item
 *     description: Create a new Task item
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - status
 *               - project
 *               - assigned_by
 *               - assigned_to
 *               - deadline
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Design UI"
 *               description:
 *                 type: string
 *                 example: "Design the dashboard UI using Tailwind"
 *               status:
 *                 type: string
 *                 enum: [to-do, in-progress, done, cancelled]
 *                 example: "to-do"
 *               project:
 *                 type: string
 *                 example: "665fe6c60ef2126f04a94888"
 *               assigned_to:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["665fe6c60ef2126f04a94871"]
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-06-01T23:59:59.000Z"
 *     responses:
 *       200:
 *         description: Task item created
 *         content:
 *           application/json:
 *             example:
 *               _id: "665fea1f7f2b4d288a7c11e0"
 *               title: "Design UI"
 *               description: "Design the dashboard UI using Tailwind"
 *               status: "to-do"
 *               project: "665fe6c60ef2126f04a94888"
 *               assigned_by: "665fe6c60ef2126f04a94870"
 *               assigned_to: ["665fe6c60ef2126f04a94871"]
 *               deadline: "2025-06-01T23:59:59.000Z"
 *               createdAt: "2025-05-17T12:00:00.000Z"
 *               updatedAt: "2025-05-17T12:00:00.000Z"
 *       500:
 *         description: Internal Server error
 */
router.post(
  "/create",
  authMiddleware,
  IsmemberOfProject,
  taskValidation,
  CreateTask
);

/**
 * @openapi
 * /tasks/:
 *   get:
 *     tags:
 *       - Task
 *     summary: Get all Tasks for a user/team
 *     description: Fetch all Task items accessible to the logged-in team
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task list retrieved
 *         content:
 *           application/json:
 *             example:
 *               - title: "UI Design"
 *                 description: "Make a prototype"
 *                 status: "to-do"
 *                 assigned_by: "665fe6c60ef2126f04a94870"
 *                 assigned_to: ["665fe6c60ef2126f04a94871"]
 *                 createdAt: "2025-03-19T18:21:42.741Z"
 *                 updatedAt: "2025-03-19T18:21:42.741Z"
 *       403:
 *         description: Forbidden / Unauthenticated
 *       500:
 *         description: Internal Server error
 */
router.get("/", authMiddleware, GetTask);

/**
 * @openapi
 * /tasks/{id}:
 *   get:
 *     tags:
 *       - Task
 *     summary: Get Task by ID
 *     description: Get a specific Task by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       403:
 *         description: Unauthorized access
 *       500:
 *         description: Internal Server error
 *   put:
 *     tags:
 *       - Task
 *     summary: Update Task by ID
 *     description: Update the Task details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [to-do, in-progress, done, cancelled]
 *               assigned_to:
 *                 type: array
 *                 items:
 *                   type: string
 *               deadline:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       403:
 *         description: Unauthorized access
 *       500:
 *         description: Internal Server error
 *   delete:
 *     tags:
 *       - Task
 *     summary: Delete Task by ID
 *     description: Delete a Task using its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       500:
 *         description: Internal Server error
 */
router.get("/:id", authMiddleware, GetTaskById);
router.put("/:id", authMiddleware, taskUpdateValidation, UpdateTask);
router.delete("/:id", authMiddleware, DeleteTask);

/**
 * @openapi
 * /tasks/byproject/{id}:
 *   get:
 *     tags:
 *       - Task
 *     summary: Get Tasks by Project ID
 *     description: Retrieve all Tasks under a specific Project
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of tasks returned
 *       403:
 *         description: Unauthorized access
 *       500:
 *         description: Internal Server error
 */
router.get("/byproject/:id", authMiddleware, GetTaskbyProdId);

export default router;
