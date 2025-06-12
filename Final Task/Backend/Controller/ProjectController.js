const Project = require("../Models/Project");

const validateMongoDbId = require("../utils/validateMongodbId");

// Create project controller
const CreateProject = async (req, res, next) => {
  try {
    let newProject = await Project.create({
      name: req.body.name,
      description: req.body.description,
      created_by: req.user._id,
      team_members: [...req.body.team_members],
    });
    res.status(200).send(newProject);
  } catch (error) {
    let err = new Error(error);
    next(err);
  }
};

//  Get all projects
const GetAllProject = async (req, res, next) => {
  try {
    let Projectlist = await Project.find().populate({
      path: "team_members created_by",
      select: "name",
    });

    res.status(200).send(Projectlist);
  } catch (error) {
    let err = new Error(error);
    next(err);
  }
};
//  Get all projects with pagination , limit , sortby and search
const GetAllProjectwithfilter = async (req, res, next) => {
  try {
    //  destructure the querys
    const page = parseInt(req.query?.page) - 1 || 0;
    const limit = parseInt(req.query?.limit) || 5;
    const search = req.query?.search || "";
    const filter = req.query?.filter || "";

    // sorting options
    let sort = req.query?.sort || "createdAt";
    req.query?.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    //  create the query for search option

    let Projectlist = await Project.find({
      name: { $regex: search, $options: "i" },
    })
      .populate({
        path: "team_members created_by",
        select: "name",
      })
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);
    let total = await Project.countDocuments({
      name: { $regex: search, $options: "i" },
    });
    res.status(200).send({ Projectlist, total });
  } catch (error) {
    let err = new Error(error);
    next(err);
  }
};

// Get specific Project using id
const GetProject = async (req, res, next) => {
  const { id } = req.params; // Project id
  validateMongoDbId(id); // validating the id
  try {
    let Projectitem = await Project.find({ _id: id }).populate({
      path: "team_members created_by",
      select: "name",
    });

    res.status(200).send(Projectitem);
  } catch (error) {
    let err = new Error(error);
    next(err);
  }
};

// Update project using Id
const UpdateProject = async (req, res, next) => {
  const { id } = req.params; // Project Id
  validateMongoDbId(id); // Validating the Id

  try {
    // Updating the database and sending the updated entry
    let newProject = await Project.findByIdAndUpdate(
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
    let err = new Error(error);
    next(err);
  }
};

//  Delete a project form the Database using Id
const DeleteProject = async (req, res, next) => {
  const { id } = req.params; // Project Id
  validateMongoDbId(id); // Validating the Id
  try {
    // Deleting the Project entry
    let Projectitem = await Project.findByIdAndDelete(id);
    res.status(200).send(Projectitem);
  } catch (error) {
    let err = new Error(error);
    next(err);
  }
};

module.exports = {
  CreateProject,
  GetAllProject,
  GetAllProjectwithfilter,
  GetProject,
  DeleteProject,
  UpdateProject,
};
