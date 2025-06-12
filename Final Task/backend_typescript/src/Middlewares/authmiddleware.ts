import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import TeamModel from "../Model/Team";

// Middleware function
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  //  check if token exist or not
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      if (token) {
        //verifing the token
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as jwt.JwtPayload;

        const user = await TeamModel.findById(decoded?.id);
        //  store user in request
        req.user = user;
        next();
      }
    } catch (error) {
      res.status(401);
      const err = new Error("Not authorized token expired, please login again");
      next(err);
    }
  } else {
    const err = new Error("Token not attached");
    res.status(401);
    next(err);
  }
};
