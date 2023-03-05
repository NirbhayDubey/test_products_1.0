const express = require("express");
const multer = require("multer");
const passport = require("passport");
const Product = require("../../../models/Product");
const router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + uniqueSuffix + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });

class ProductRoute {
  static async getAllProducts(req, res) {
    try {
      const products = await Product.find();
      if (!products) throw products;
      return res.status(200).json({
        status: true,
        data: {
          products: products,
        },
        message: "Products not found",
      });
    } catch (error) {
      return res.status(200).json({
        status: false,
        data: null,
        message: "Products not found",
      });
    }
  }
  static async postProduct(req, res) {
    try {
      const upImages = await req.files;
      let upImagesNames = upImages.map((item) => item.filename);
      const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
        image: upImagesNames,
      });
      const result = await newProduct.save();
      if (!result) throw result;
      return res.status(200).json({
        status: true,
        data: {
          product: result,
        },
        message: "Product Inserted successfully",
      });
    } catch (error) {
      return res.status(200).json({
        status: false,
        data: null,
        message: "Product not inserted",
      });
    }
  }
  static async updateProduct(req, res) {
    try {
      const upProduct = await Product.findById(req.params.pid);
      if (!upProduct) throw upProduct;
      upProduct.set({
        ...upProduct,
        ...req.body,
      });
      const result = await upProduct.save();
      if (!result) throw result;
      return res.status(200).json({
        status: true,
        data: {
          product: result,
        },
        message: "Product updated successfully",
      });
    } catch (error) {
      return res.status(200).json({
        status: false,
        data: null,
        message: "No product to update",
      });
    }
  }
  static async removeProduct(req, res) {
    try {
      const result = await Product.findOneAndRemove({ _id: req.params.pid });
      if (!result) throw result;
      return res.status(200).json({
        status: true,
        data: {
          product: result,
        },
        message: "Product removed",
      });
    } catch (error) {
      return res.status(200).json({
        status: false,
        data: null,
        message: "Product not removed",
      });
    }
  }
}

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  ProductRoute.getAllProducts
);
router.post(
  "/",
  [passport.authenticate("jwt", { session: false }), upload.array("image", 10)],
  ProductRoute.postProduct
);
router.put(
  "/:pid",
  passport.authenticate("jwt", { session: false }),
  ProductRoute.updateProduct
);
router.delete(
  "/:pid",
  passport.authenticate("jwt", { session: false }),
  ProductRoute.removeProduct
);

module.exports = router;
