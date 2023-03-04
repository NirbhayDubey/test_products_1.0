const express = require("express");
const loginRoute = require("./login/login");
const router = express.Router();

router.use("/", loginRoute);

module.exports = router;
