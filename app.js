const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const db = require("./db/connect");
const clientsRoutes = require("./routes/clients");
const servicesRoutes = require("./routes/services");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.get("/", (req, res) => {
  res.status(200).send("Welcome to CSE341 Project 2 API!");
});

app.use("/clients", clientsRoutes);
app.use("/services", servicesRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

db.initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to DB and listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error.message);
  });