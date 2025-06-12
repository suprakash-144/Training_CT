const express = require("express");
const dbConnect = require("./Config/dbConnect");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const Teamrouter = require("./Routes/Teamroute");
const Projectrouter = require("./Routes/Projectroute");
const Taskrouter = require("./Routes/Taskroute");
const { notFound, errorHandler } = require("./Middlewares/errorHandler");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();
const swagger = require("./swagger");

// configurations and connections
dbConnect();

// middleware Setup
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
//  sawgger setup
swagger(app);

// Routes
app.use("/api/team", Teamrouter);
app.use("/api/project", Projectrouter);
app.use("/api/tasks", Taskrouter);

//  Starting route
app.get("/", async (req, res) => {
  res.json("Server is running");
});

//error handling
app.use(notFound);
app.use(errorHandler);

// server config
app.listen(process.env.PORT, () => {
  console.log(`Server is running  at ${process.env.BACKENDURL}/`);
  console.log(`Swagger is running  at ${process.env.BACKENDURL}/docs`);
});
