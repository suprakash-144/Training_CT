import * as jwt from "jsonwebtoken";
import TeamModel from "../Model/Team";
import generateRefreshToken from "../utils/GenerateRefreshToken";
import generateToken from "../utils/GenerateJwtToken";
import validateMongoDbId from "../utils/ValidateMongoId";
import { NextFunction, Request, Response } from "express";

// 👉 Create a User
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.body.email;
    // Check if user already exists
    const findUser = await TeamModel.findOne({ email });
    if (!findUser) {
      // Create new user if not found
      const newUser = await TeamModel.create(req.body);
      res.json(newUser);
    } else {
      res.status(409);
      throw new Error("User Already Exists");
    }
  } catch (error) {
    next(error);
  }
};

// 👉 Signup user controller
const SignupUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.body.email;
    // Check if user already exists
    const findUser = await TeamModel.findOne({ email });
    if (!findUser) {
      // Create new user and generate tokens
      const newUser = await TeamModel.create(req.body);
      const refreshToken = generateRefreshToken(newUser._id as string);
      // Update user with refresh token
      await TeamModel.findByIdAndUpdate(
        newUser.id,
        { refreshToken },
        { new: true }
      );
      // Set refresh token in cookies
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      // Send back user info and JWT
      res.json({
        name: newUser.name,
        token: generateToken(newUser._id as string),
      });
    } else {
      res.status(409);
      throw new Error("User Already Exists");
    }
  } catch (error) {
    next(error);
  }
};

// 👉 Login a user
const loginUserCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    // Check if user exists and password matches
    const findUser = await TeamModel.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
      const refreshToken = generateRefreshToken(findUser._id as string);
      // Update refresh token in DB
      await TeamModel.findByIdAndUpdate(
        findUser.id,
        { refreshToken },
        { new: true }
      );
      // Set refresh token in cookies
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      // Send back user info and JWT
      res.json({
        name: findUser.name,
        token: generateToken(findUser._id as string),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    next(error);
  }
};

// 👉 Handle refresh token
const handleRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) {
      res.status(401);
      throw new Error("No Refresh Token in Cookies");
    }

    const refreshToken = cookie.refreshToken;
    // Check if refresh token matches in DB
    const user = await TeamModel.findOne({ refreshToken });
    if (!user) {
      res.status(401);
      throw new Error("No Refresh token present in DB or does not match");
    }

    // Verify refresh token
    jwt.verify(
      refreshToken,
      process.env.JWT_SECRET as string,
      (err, decoded) => {
        if (err) {
          res.status(401);
          return next(new Error("Invalid refresh token"));
        }

        const decodedPayload = decoded as jwt.JwtPayload;
        // Validate decoded ID matches the user's ID
        if (!decodedPayload.id || user.id !== decodedPayload.id) {
          res.status(401);
          return next(new Error("Invalid refresh token payload"));
        }

        // Generate new access token
        const accessToken = generateToken(user._id as string);
        res.json({ accessToken });
      }
    );
  } catch (error) {
    next(error);
  }
};

// 👉 Get all team members
const GetAllTeam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Teamlist = await TeamModel.find().select("-password -refreshToken");
    res.json(Teamlist);
  } catch (error) {
    next(error);
  }
};
// Get all Team members with filters , limit , page , sortby features
const GetAllTeamwithFilters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Query Parameters with Defaults
    const page = Math.max(parseInt(req.query.page as string) - 1, 0) || 0;
    const limit = parseInt(req.query.limit as string) || 5;
    const search = (req.query.search as string) || "";
    const filter = Array.isArray(req.query.filter)
      ? (req.query.filter as string[])
      : req.query.filter
      ? [req.query.filter as string]
      : [];

    // Sorting logic
    const sortParam = (req.query.sort as string) || "createdAt";
    const [sortField, sortOrder] = sortParam.split("-");
    const sortBy: Record<string, 1 | -1> = {
      [sortField]: sortOrder === "desc" ? -1 : 1,
    };

    // Query construction
    const query: any[] = [
      {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      },
    ];

    if (filter.length > 0) {
      query.push({ designation: { $in: filter.map((item) => item.trim()) } });
    }

    const Teamlist = await TeamModel.find({ $and: query })
      .select("-password -refreshToken")
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await TeamModel.countDocuments({ $and: query });

    res.status(200).json({ Teamlist, total });
  } catch (error) {
    next(error);
  }
};

// 👉 Get a specific team member
const GetaTeammember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);
    const Teammember = await TeamModel.findById(id).select(
      "-password -refreshToken"
    );
    if (!Teammember) {
      res.status(404);
      throw new Error("Team member not found");
    }
    res.json(Teammember);
  } catch (error) {
    next(error);
  }
};

// 👉 Logout functionality
const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) {
      res.status(401);
      next(new Error("No Refresh Token in Cookies"));
    }

    const refreshToken = cookie.refreshToken;
    // Remove refresh token from DB
    const user = await TeamModel.findOne({ refreshToken });
    if (!user) {
      res.clearCookie("refreshToken", { httpOnly: true, secure: true });
      res.sendStatus(204);
      return;
    }

    await TeamModel.findByIdAndUpdate(user.id, { refreshToken: "" });
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });
    res.sendStatus(204);
    return;
  } catch (error) {
    next(error);
  }
};

// 👉 Export all controllers
export {
  loginUserCtrl,
  SignupUser,
  createUser,
  logoutUser,
  GetAllTeam,
  GetaTeammember,
  handleRefreshToken,
  GetAllTeamwithFilters,
};
