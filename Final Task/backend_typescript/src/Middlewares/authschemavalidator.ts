import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const signupValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().max(100).required(),
    designation: Joi.string().max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400);
    next(new Error("Bad Request"));
  }
  next();
};
export const loginValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400);
    next(new Error("Bad Request"));
  }
  next();
};
