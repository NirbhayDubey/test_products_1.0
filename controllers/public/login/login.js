const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();
const User = require("../../../models/User");

class LoginRoute {
  static TOKEN_TIMEOUT = 3600 * 1;
  static async getUser(req, res) {
    return res.status(200).json({
      status: true,  
      data: null,
      message: "Auth Token validated",
    });
  }

  static async postLogin(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
      });
      if (!user) throw user;
      const payload = { id: user._id, name: user.name, email: user.email };
      const token = await jwt.sign(payload, global.config.secretKey, {
        expiresIn: LoginRoute.TOKEN_TIMEOUT,
      });
      if (!token) throw token;
      return res.status(200).json({
        status: true,
        data: {
          token: token,
        },
        message: "Login success",
      });
    } catch (error) {
      return res.status(200).json({
        status: false,
        data: null,
        message: "User not found",
      });
    }
  }
}

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  LoginRoute.getUser
);
router.post("/", LoginRoute.postLogin);

module.exports = router;
