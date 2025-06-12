import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application, Request, Response } from "express";

import path from "path";
const options: swaggerJsdoc.Options = {
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
  apis: [path.resolve(__dirname, "Routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(options);

export default (app: Application): void => {
  // Serve Swagger UI
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/docs.json", (_req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};
