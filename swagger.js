const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "CSE341 Project 2 API",
    description: "REST API for managing clients and services",
    version: "1.0.0",
  },
  host: "cse341-project2-ci8r.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger.json";

const endpointsFiles = [
  "./routes/clients.js",
  "./routes/services.js",
];

swaggerAutogen(outputFile, endpointsFiles, doc);