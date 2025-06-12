import { Request, Response, NextFunction } from "express";
import TaskModel from "../Model/Task";
import validateMongoDbId from "../utils/ValidateMongoId";

// 📝 Create Task Entry
export const CreateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let newTask = await TaskModel.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      project: req.body.project,
      assigned_by: req.user._id,
      assigned_to: [...req.body.assigned_to],
      deadline: req.body.deadline,
    });
    res.status(200).send(newTask);
  } catch (error) {
    let err = new Error((error as Error).message);
    next(err);
  }
};

// 📝 Get tasks of the Logged in user
export const GetTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // query for tasks of logged in user
    let Tasklist = await TaskModel.find({ assigned_to: req.user._id }).populate(
      [
        {
          path: "assigned_to",
          select: "name designation",
        },
        {
          path: "project",
          select: "name",
        },
      ]
    );
    res.status(200).send(Tasklist);
  } catch (error) {
    let err = new Error((error as Error).message);
    next(err);
  }
};

// 📝 Get all tasks of a Project
export const GetTaskbyProdId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params; // Getting project Id
  validateMongoDbId(id); // Validate Id
  try {
    let TaskItem = await TaskModel.find({ project: id }).populate([
      {
        path: "assigned_to",
        select: "name",
      },
      {
        path: "project",
        populate: {
          path: "team_members",
          select: "name designation",
        },
        select: "name team_members",
      },
    ]);
    res.status(200).send(TaskItem);
  } catch (error) {
    let err = new Error((error as Error).message);
    next(err);
  }
};

// 📝 Get the Tasks with ID
export const GetTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params; // Task Id
  validateMongoDbId(id); // Validate Id
  try {
    let TaskItem = await TaskModel.find({ _id: id }).populate([
      {
        path: "assigned_to",
        select: "name",
      },
      {
        path: "project",
        populate: {
          path: "team_members",
          select: "name designation",
        },
        select: "name team_members",
      },
    ]);
    res.status(200).send(TaskItem);
  } catch (error) {
    let err = new Error((error as Error).message);
    next(err);
  }
};

// 📝 Update Tasks with Id
export const UpdateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params; // Task Id
  validateMongoDbId(id); // Validate Id
  try {
    //  Update task and return updated entry
    let newTask = await TaskModel.findByIdAndUpdate(
      { _id: id },
      {
        // title: req.body?.title,
        // description: req.body?.description,
        status: req.body?.status,
        // assigned_to: [...req.body?.assigned_to],
        // deadline: req.body?.deadline,
      },
      { new: true }
    );
    res.status(200).send(newTask);
  } catch (error) {
    let err = new Error((error as Error).message);
    next(err);
  }
};

// 📝 Delete a Task with Id
export const DeleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params; // Task Id
  validateMongoDbId(id); // Validate Id
  try {
    let Tasks = await TaskModel.findByIdAndDelete(id);
    res.status(200).send(Tasks);
  } catch (error) {
    let err = new Error((error as Error).message);
    next(err);
  }
};

// Export all functions as a module
export default {
  CreateTask,
  GetTask,
  DeleteTask,
  UpdateTask,
  GetTaskById,
  GetTaskbyProdId,
};
