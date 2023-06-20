const express = require("express");
const seriesRoute = require("./series");
const seasonRoute = require("./season");
const userRoute = require("./user");

const router = express.Router();

router.use("/series", seriesRoute);
router.use("/series/:seriesID/seasons", seasonRoute);
router.use("/user", userRoute);

module.exports = router;
