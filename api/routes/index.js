const express = require("express");
const router = express.Router();
const seriesRoute = require("./series");
const seasonRoute = require("./season");
const userRoute = require("./user");

router.use("/series", seriesRoute);
router.use("/series/:seriesID/seasons", seasonRoute);
router.use("/user", userRoute);

module.exports = router;
