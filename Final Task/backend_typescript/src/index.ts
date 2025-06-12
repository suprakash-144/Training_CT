import express from "express";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dbConnect from "./Config/dbConnect";
import TeamRouter from "./Routes/TeamRouter";
import PeojectRouter from "./Routes/ProjectRouter";
import TaskRouter from "./Routes/TaskRouter";

import { customErrorHandler, notFound } from "./Middlewares/errorHandler";
import Swagger from "./Swagger";
const app = express();
// configurations and connections
dbConnect();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

Swagger(app);
app.use("/api/team/", TeamRouter);
app.use("/api/project", PeojectRouter);
app.use("/api/tasks", TaskRouter);
//  Starting route
app.get("/", async (req: Request, res: Response) => {
  // req.user="asd";
  res.json("Server is running");
});

//error handling
app.use(notFound);
app.use(customErrorHandler);
// server config
app.listen(process.env.PORT, () => {
  console.log(`Server is running  at ${process.env.BACKENDURL}/`);
  console.log(`Swagger is running  at ${process.env.BACKENDURL}/docs`);
});
