import { Router } from "express";
import { authMiddleware } from "../Middlewares/authmiddleware";
import {
  ProjectUpdateValidation,
  ProjectValidation,
} from "../Middlewares/projectschemavalidator";
import {
  CreateProject,
  DeleteProject,
  GetAllProject,
  GetProject,
  UpdateProject,
} from "../Controller/ProjectController";
import { IsmemberOfProject } from "../Middlewares/Authorization";

const router = Router();
/**
 * @openapi
 * /project/create:
 *   post:
 *     tags:
 *       - Project
 *     summary: Create a new Project
 *     description: Creates a new project with required fields
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - team_members
 *             properties:
 *               name:
 *                 type: string
 *                 example: "IoT Smart Home"
 *               description:
 *                 type: string
 *                 example: "Project for smart home automation using IoT"
 *               team_members:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["665fe6c60ef2126f04a94871", "665fe6c60ef2126f04a94872"]
 *     responses:
 *       200:
 *         description: Project item created
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 _id: "665fe80f1f8a4a2b446b8c55"
 *                 name: "IoT Smart Home"
 *                 description: "Project for smart home automation using IoT"
 *                 created_by: "665fe6c60ef2126f04a94870"
 *                 team_members:
 *                   - "665fe6c60ef2126f04a94871"
 *                   - "665fe6c60ef2126f04a94872"
 *                 status: false
 *                 createdAt: "2025-05-17T10:00:00.000Z"
 *                 updatedAt: "2025-05-17T10:00:00.000Z"
 *       500:
 *         description: Internal Server Error
 */
router.post("/create", authMiddleware, ProjectValidation, CreateProject);

/**
 * @openapi
 * /project/:
 *   get:
 *     tags:
 *     - Project
 *     summary: Get all the Project
 *     description: Get all the Project
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Project is received
 *         content:
 *          application/json:
 *           schema:
 *           example:
 *             "title": "First Project"
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

router.get("/all", authMiddleware, GetAllProject);
/**
 * @openapi
 * /project/{id}:
 *   get:
 *     tags:
 *     - Project
 *     summary: Get the Specific Project
 *     description: Get the details of the Project
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
 *       403:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 *   delete:
 *     tags:
 *     - Project
 *     summary: delete a Project item by id
 *     description: delete a Project item by id
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

router.get("/:id", authMiddleware, GetProject);
router.delete("/:id", authMiddleware, IsmemberOfProject, DeleteProject);
/**
 * @openapi
 * /project/{id}:
 *   put:
 *     tags:
 *       - Project
 *     summary: Update a Project
 *     description: Updates project details by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - team_members
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *                 example: "IoT Smart Home V2"
 *               description:
 *                 type: string
 *                 example: "Updated description for smart home project"
 *               team_members:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["665fe6c60ef2126f04a94871", "665fe6c60ef2126f04a94872"]
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       403:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */

router.put(
  "/:id",
  authMiddleware,
  IsmemberOfProject,
  ProjectUpdateValidation,
  UpdateProject
);

export default router;
