// not Found route handler

import { NextFunction, Request, Response } from "express";

const notFound = async (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found : ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Global Error Handler Formate

const customErrorHandler = async (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
  res.status(statuscode);
  res.json({
    status: "fail",
    message: err?.message,
  });
};

export { customErrorHandler, notFound };
