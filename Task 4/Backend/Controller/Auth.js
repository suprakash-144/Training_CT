const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateToken } = require("../utils/jwtToken");

//   Create a User
const createUser = async (req, res, next) => {
  const email = req.body.email;

  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    // throw new Error("User Already Exists");
    const error = new Error("User Already Exists");
    next(error);
  }
};

// Login a user
const loginUserCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    let token = generateToken(findUser?._id);
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: token,
    });
  } else {
    const error = new Error("Invalid Credentials");
    next(error);
  }
};

// Get all users

const getallUser = async (req, res, next) => {
  try {
    const getUsers = await User.find().select("-password");
    res.json(getUsers);
  } catch (err) {
    // throw new Error(error);
    const error = new Error(err);
    next(error);
  }
};

// Get a single user

const getaUser = async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getaUser = await User.findById(id).select("-password ");
    res.json({
      getaUser,
    });
  } catch (err) {
    // throw new Error(error);
    const error = new Error(err);
    next(error);
  }
};
// Update a User
const updatedUser = async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
        role: req?.body?.role,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (err) {
    // throw new Error(error);
    const error = new Error("Update Failed");
    next(error);
  }
};
// Delete a single user

const deleteaUser = async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);

  if (id == req.user._id) {
    const error = new Error("Cannot Delete Active user");
    next(error);
  } else {
    try {
      const deleteaUser = await User.findByIdAndDelete(id);
      res.json({
        deleteaUser,
      });
    } catch (err) {
      // throw new Error(error);
      const error = new Error("Delete Failed");
      next(error);
    }
  }
};

module.exports = {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
};
