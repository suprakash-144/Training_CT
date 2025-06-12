const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API documentation",
      version: "1.0.0",
      description:
        "All endpoints and the request and response formats for the API",
    },
    servers: [
      {
        url: `http://localhost:8000/api`,
        description: "Local Development Server",
      },
      {
        url: `${process.env.BACKENDURL}/api`,
        description: "Production Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "./Routes/Teamroute.js",
    "./Routes/Projectroute.js",
    "./Routes/Taskroute.js",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = (app) => {
  // Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};
