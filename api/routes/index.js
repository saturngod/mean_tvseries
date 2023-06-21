const express = require("express");
const seriesRoute = require("./series");
const userRoute = require("./user");

const router = express.Router();

router.use("/series", seriesRoute);
router.use("/user", userRoute);

module.exports = router;
