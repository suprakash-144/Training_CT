const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateToken } = require("../utils/jwtToken");
const { generateRefreshToken } = require("../utils/refreshtoken");

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
      secure: true,
      sameSite: "None",
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      email: findUser?.email,

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
  const cookie = req.cookies;
  if (!cookie?.refreshToken) next(new Error("No Refresh Token in Cookies"));
  else {
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user)
      next(new Error(" No Refresh token present in db or not matched"));
    else {
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

// logout functionality

const logout = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
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
};

module.exports = {
  createUser,
  loginUserCtrl,
  handleRefreshToken,
  logout,
};
