const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const passport = require("passport");
const indexRoute = require("./controllers/index");

// Connecting mongodb
global.config = require("./setup/config");
mongoose.connect(global.config.mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", () => console.log("Error while connecting database"));
db.once("open", () => console.log("Database connected successfully"));

// Adding middlewares
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
require("./strategies/jwtStrategy")(passport);
app.use("/", indexRoute);

const portno = process.env.PORT || 5000;
app.listen(portno, () => {
  console.log(`Server is running at port no. ${portno}`);
});
