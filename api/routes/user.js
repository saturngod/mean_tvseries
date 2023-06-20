const express = require("express");
const userController = require("../controllers/user.controller")
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.route("/")
  .post(userController.register);

router.route("/profile")
  .patch(authController.auth, userController.partialUpdate);

router.route("/login")
  .post(userController.login);

module.exports = router;
