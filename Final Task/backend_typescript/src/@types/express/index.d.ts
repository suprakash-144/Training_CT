import * as express from "express";

import TeamModel from "../../Model/Team";

declare global {
  namespace Express {
    interface Request {
      user?: TeamModel;
    }
  }
}
