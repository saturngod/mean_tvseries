const express= require("express");
const seasonController= require("../controllers/season.controller")

const router= express.Router();

router.route("/")
    .get(seasonController.findAll);

router.route("/:seasonID")
    .get(seasonController.findById);

module.exports = router;