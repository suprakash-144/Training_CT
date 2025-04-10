const Todo = require("../Models/Todo");

const validateMongoDbId = require("../utils/validateMongodbId");

const CreateTodo = async (req, res, next) => {
  try {
    let newtodo = await Todo.create({
      title: req.body.title,
      body: req.body.body,
      completion: req.body.completion,
      by: req.user._id,
    });
    res.status(200).send(newtodo);
  } catch (error) {
    let err = new Error(error);
    next(err);
  }
};
const GetTodo = async (req, res, next) => {
  const { status } = req?.query;

  if (status) {
    try {
      let todolist = await Todo.find({ by: req.user._id })
        .populate({
          path: "by",
          select: "name",
        })
        .where({ completion: status });

      res.status(200).send(todolist);
    } catch (error) {
      let err = new Error(error);
      next(err);
    }
  } else {
    try {
      let todolist = await Todo.find({ by: req.user._id }).populate({
        path: "by",
        select: "name",
      });

      res.status(200).send(todolist);
    } catch (error) {
      let err = new Error(error);
      next(err);
    }
  }
};
const UpdateTodo = async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    let newtodo = await Todo.findByIdAndUpdate(
      { _id: id },
      {
        title: req.body?.title,
        body: req.body?.body,
        completion: req.body?.completion,
      },
      { new: true }
    );
    res.status(200).send(newtodo);
  } catch (error) {
    let err = new Error(error);
    next(err);
  }
};
const DeleteTodo = async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    let todo = await Todo.findByIdAndDelete(id);
    res.status(200).send(todo);
  } catch (error) {
    let err = new Error(error);
    next(err);
  }
};

module.exports = { CreateTodo, GetTodo, DeleteTodo, UpdateTodo };
