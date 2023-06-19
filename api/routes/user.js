const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller")
const authController = require("../controllers/auth.controller");

router.route("/")
  .post(userController.register);

router.route("/profile")
  .patch(authController.auth, userController.partialUpdate);

router.route("/login")
  .post(userController.login);

module.exports = router;
