const express = require("express");
const passport = require(`passport`);
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();
const DB = require("./config/database");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const server = require("http").createServer(app);
const uri = process.env.DBURI;
let env = process.env.NODE_ENV;
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const users = require("./routes/userRoutes");
const car = require("./routes/carRoutes");
const category = require("./routes/categoryRoutes");
let swaggerOptions = require("./swagger");

const swaggerSpecs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

console.log("2@@ dotenv", process.env.NODE_ENV);
DB(uri);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const whitelist = ["http://localhost:3000", "https://localhost:3000"];
const corsOptions = {
  origin(origin, callback) {
    if (
      whitelist.indexOf(origin) !== -1 ||
      !origin ||
      (app.get("env") === "development" &&
        (origin.indexOf("192.168") >= 0 || origin === "null")) ||
      origin === "null"
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes

app.use("/users", users);
app.use("/cars", car);
app.use("/category", category);

if (env === "production") {
  server.listen(process.env.PORT || 4000, () => {
    console.log(`Example app listening at http://localhost`);
  });
} else {
  server.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
  });
}
