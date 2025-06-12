import Joi from "joi";

import { NextFunction, Request, Response } from "express";

export const taskValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    title: Joi.string().max(100).required(),
    description: Joi.string().required(),
    // status: Joi.string()
    //   .required()
    //   .valid("to-do", "in-progress", "done", "cancelled"),
    project: Joi.string().required(),
    deadline: Joi.date().required(),
    assigned_to: Joi.array().min(1).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);

    res.status(400);
    next(new Error("Bad Request"));
  }
  next();
};
export const taskUpdateValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    status: Joi.string()
      .required()
      .valid("to-do", "in-progress", "done", "cancelled"),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);

    res.status(400);
    next(new Error("Bad Request"));
  }
  next();
};
