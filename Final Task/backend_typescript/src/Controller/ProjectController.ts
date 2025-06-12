import { Request, Response, NextFunction } from "express";
import ProjectModel from "../Model/Project";
import validateMongoDbId from "../utils/ValidateMongoId";

// 📝 Create project controller
export const CreateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let newProject = await ProjectModel.create({
      name: req.body.name,
      description: req.body.description,
      created_by: req.user._id,
      team_members: [...req.body.team_members],
    });
    res.status(200).send(newProject);
  } catch (error) {
    let err = new Error((error as Error).message);
    next(err);
  }
};

// 📝 Get all projects
export const GetAllProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let Projectlist = await ProjectModel.find().populate({
      path: "team_members created_by",
      select: "name",
    });

    res.status(200).send(Projectlist);
  } catch (error) {
    let err = new Error((error as Error).message);
    next(err);
  }
};

// 📝 Get all projects with pagination, limit, sortby, and search
export const GetAllProjectwithfilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Parse and sanitize query params
    const page = Math.max(parseInt(req.query.page as string) - 1, 0) || 0;
    const limit = parseInt(req.query.limit as string) || 5;
    const search = (req.query.search as string) || "";

    // Handle sorting
    const sortParam = (req.query.sort as string) || "createdAt";
    const [sortField, sortOrder] = sortParam.split("-");
    const sortBy: Record<string, 1 | -1> = {
      [sortField]: sortOrder === "desc" ? -1 : 1,
    };

    // Build MongoDB query
    const query: Record<string, any> = {
      name: { $regex: search, $options: "i" },
    };

    const Projectlist = await ProjectModel.find(query)
      .populate([
        { path: "team_members", select: "name" },
        { path: "created_by", select: "name" },
      ])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await ProjectModel.countDocuments(query);

    res.status(200).json({ Projectlist, total });
  } catch (error) {
    next(new Error((error as Error).message));
  }
};

// 📝 Get specific Project using id
export const GetProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params; // Project id
  validateMongoDbId(id); // validating the id
  try {
    let Projectitem = await ProjectModel.find({ _id: id }).populate({
      path: "team_members created_by",
      select: "name",
    });

    res.status(200).send(Projectitem);
  } catch (error) {
    let err = new Error((error as Error).message);
    next(err);
  }
};

// 📝 Update project using Id
export const UpdateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params; // Project Id
  validateMongoDbId(id); // Validating the Id
  try {
    // Updating the database and sending the updated entry
    let newProject = await ProjectModel.findByIdAndUpdate(
      { _id: id },
      {
        name: req.body.name,
        description: req.body.description,
        team_members: req.body.team_members,
        status: req.body.status,
      },
      { new: true }
    );
    res.status(200).send(newProject);
  } catch (error) {
    let err = new Error((error as Error).message);
    next(err);
  }
};

// 📝 Delete a project from the Database using Id
export const DeleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params; // Project Id
  validateMongoDbId(id); // Validating the Id
  try {
    // Deleting the Project entry
    let Projectitem = await ProjectModel.findByIdAndDelete(id);
    res.status(200).send(Projectitem);
  } catch (error) {
    let err = new Error((error as Error).message);
    next(err);
  }
};

// 📝 Export all controllers
export default {
  CreateProject,
  GetAllProject,
  GetAllProjectwithfilter,
  GetProject,
  DeleteProject,
  UpdateProject,
};
