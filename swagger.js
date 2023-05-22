const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Documentation",
      version: "1.0.0",
      description: "API documentation ",
    },
    servers: [
      {
        url: "http://localhost:3100",
        basePath: "/",
      },
    ],
  },
  apis: [
    "./routes/userRoutes.js",
    "./routes/carRoutes.js",
    "./routes/categoryRoutes.js",
  ],
};
module.exports = swaggerOptions;
