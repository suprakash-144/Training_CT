import { NextFunction, Request, Response } from "express";
import ProjectModel from "../Model/Project";

//  Check if a Team member is part of the project
export const IsmemberOfProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params; // Team member Id
  const proid = req.body?.project; // project Id

  // query to check for the team member in the project database
  let Projectlist = await ProjectModel.find({
    $and: [
      { $or: [{ _id: id }, { _id: proid }] },
      { $or: [{ created_by: req.user._id }, { team_members: req.user._id }] },
    ],
  }).populate({
    path: "team_members created_by",
    select: "name",
  });

  //  check if part of member then pass to next controller or return request
  if (!Projectlist || Projectlist.length === 0) {
    res.status(403);
    const err = new Error("Access denied!  Not a member of the Project");
    next(err);
  }
  next();
};
