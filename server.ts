import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import config from "./config";

const port = process.env.PORT || 8080;
const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to ServiceAdviserAPI application." });
});

try {
  mongoose.connect(config.connectionString, config.options);
  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });
  mongoose.connection.on("error", () => {
    console.log("Error while conneting to MongoDB");
  });
} catch (ex) {
  console.log(ex);
}

require("./src/controllers/OwnerController")(app);
require("./src/controllers/ServiceContoller")(app);
require("./src/controllers/VehicleController")(app);
require("./src/controllers/ServiceBulletinController")(app);

const server = app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});

module.exports = server;
