const jwt = require("jsonwebtoken");
const User = require("../Models/Team");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateToken } = require("../utils/jwtToken");
const { generateRefreshToken } = require("../utils/refreshtoken");

//   Create a User
const createUser = async (req, res, next) => {
  // getting the email address
  const email = req.body.email;
  // checking if the user exist in the database
  const findUser = await User.findOne({ email: email });
  // logic to send error or create new user
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    res.status(409);
    const error = new Error("User Already Exists");
    next(error);
  }
};

//  Signup user controller
const SignupUser = async (req, res, next) => {
  // Getting email address and checking if user already exist in database
  const email = req.body.email;

  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    // if user does  not exist create a token and a refresh token
    const newUser = await User.create(req.body);
    const refreshToken = await generateRefreshToken(newUser?._id);
    // update the refresh token in the user database  and send refresh token in cookies
    const updateuser = await User.findByIdAndUpdate(
      newUser.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      name: newUser?.name,
      token: generateToken(newUser?._id),
    });
  } else {
    res.status(409);
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
    // update the refresh token in the user database  and send refresh token in cookies
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      name: findUser?.name,
      token: generateToken(findUser?._id),
    });
  } else {
    const error = new Error("Invalid Credentials");
    res.status(401);
    next(error);
  }
};

// handle refresh token
const handleRefreshToken = async (req, res, next) => {
  // check if refresh token is in cookies
  const cookie = req.cookies;
  if (!cookie?.refreshToken) next(new Error("No Refresh Token in Cookies"));
  else {
    // check if refresh token matches from the database
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user)
      next(new Error(" No Refresh token present in db or not matched"));
    else {
      // verify the token
      jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
          next(new Error("There is something wrong with refresh token"));
        } else {
          const accessToken = generateToken(user?._id);
          res.json({ accessToken });
        }
      });
    }
  }
};

// Get all Team members
const GetAllTeam = async (req, res, next) => {
  try {
    let Teamlist = await User.find().select("-password -refreshToken");
    res.json(Teamlist);
  } catch (error) {
    next(error);
  }
};

// Get all Team members with filters , limit , page , sortby features
const GetAllTeamwithFilters = async (req, res, next) => {
  try {
    //  destructure the querys
    const page = parseInt(req.query?.page) - 1 || 0;
    const limit = parseInt(req.query?.limit) || 5;
    const search = req.query?.search || "";
    const filter = req.query?.filter || "";

    // sorting options
    let sort = req.query?.sort || "createdAt";
    req.query?.sort ? (sort = req.query.sort.split("-")) : (sort = [sort]);
    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    //  create the query for search and filter option
    let query = [
      {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      },
    ];
    // chcek if filter options exist
    if (filter) {
      const filters = filter.map((item) => item.trim());
      query.push({ designation: { $in: filters } });
    }
    let Teamlist = await User.find({
      $and: query,
    })
      .select("-password -refreshToken")
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);
    let total = await User.countDocuments({
      $and: query,
    });
    res.json({ Teamlist, total });
  } catch (error) {
    next(error);
  }
};

//  Get a specific team meamber using id
const GetaTeammember = async (req, res, next) => {
  const { id } = req.params; // Geting the id
  validateMongoDbId(id); // validationg the id
  try {
    //searhing the database to return the team member
    let Teammember = await User.find({ _id: id }).select(
      "-password -refreshToken"
    );
    res.json(Teammember);
  } catch (error) {
    next(error);
  }
};

// logout functionality
const logout = async (req, res, next) => {
  //check if refresh token exist in cookies
  const cookie = req.cookies;
  if (!cookie?.refreshToken) next(new Error("No Refresh Token in Cookies"));
  else {
    // check database to match refresh token
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
      // clear refresh token from cookies
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      return res.sendStatus(204); // forbidden
    }
    // remove  refresh token
    await User.findOneAndUpdate(
      { refreshToken },
      {
        refreshToken: "",
      }
    );
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    res.sendStatus(204); // forbidden
  }
};

module.exports = {
  GetAllTeamwithFilters,
  createUser,
  loginUserCtrl,
  handleRefreshToken,
  logout,
  GetaTeammember,
  GetAllTeam,
  SignupUser,
};
