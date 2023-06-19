const express= require("express");
const router= express.Router();
const seasonController= require("../controllers/season.controller")

router.route("/")
    .get(seasonController.findAll);

router.route("/:seasonID")
    .get(seasonController.findById);

module.exports = router;