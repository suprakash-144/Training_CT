const Task = require("../Models/Task");

const validateMongoDbId = require("../utils/validateMongodbId");

// Create Task Entry
const CreateTask = async (req, res, next) => {
  try {
    let newTask = await Task.create({
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
    let err = new Error(error);
    next(err);
  }
};

// Get tasks of the Logged in user
const GetTask = async (req, res, next) => {
  try {
    // query for tasks of logged in user
    let Tasklist = await Task.find({ assigned_to: req.user._id }).populate([
      {
        path: "assigned_to",
        select: "name designation",
      },
      {
        path: "project",

        select: "name ",
      },
    ]);
    res.status(200).send(Tasklist);
  } catch (error) {
    let err = new Error(error);
    next(err);
  }
};

//  Get all tasks if a Project
const GetTaskbyProdId = async (req, res, next) => {
  const { id } = req.params; // Getting project Id
  validateMongoDbId(id); // Validate Id
  try {
    let TaskItem = await Task.find({ project: id }).populate([
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
    let err = new Error(error);
    next(err);
  }
};

// Get the Tasks with ID
const GetTaskById = async (req, res, next) => {
  const { id } = req.params; // Task Id
  validateMongoDbId(id); // Validate Id
  try {
    let TaskItem = await Task.find({ _id: id }).populate([
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
    let err = new Error(error);
    next(err);
  }
};

//  Update Tasks with Id
const UpdateTask = async (req, res, next) => {
  const { id } = req.params; // Task Id
  validateMongoDbId(id); // Validate Id

  try {
    //  Update task and return updated entry
    let newTask = await Task.findByIdAndUpdate(
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
    let err = new Error(error);
    next(err);
  }
};

//  Delate a Task with Id
const DeleteTask = async (req, res, next) => {
  const { id } = req.params; // Task Id
  validateMongoDbId(id); // Validate Id
  try {
    let Tasks = await Task.findByIdAndDelete(id);
    res.status(200).send(Tasks);
  } catch (error) {
    let err = new Error(error);
    next(err);
  }
};

module.exports = {
  CreateTask,
  GetTask,
  DeleteTask,
  UpdateTask,
  GetTaskById,
  GetTaskbyProdId,
};
