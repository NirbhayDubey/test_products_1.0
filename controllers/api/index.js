const express = require("express");
const productsRoute = require("./product/product");
const router = express.Router();

router.use("/product", productsRoute);

module.exports = router;
