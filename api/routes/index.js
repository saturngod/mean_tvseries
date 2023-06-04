const express = require("express");
const router = express.Router();
const seriesController = require("../controllers/series.controller");
const seasonController = require("../controllers/season.controller");

router.route("/series")
  .get(seriesController.GetAll)
  .post(seriesController.Add);

router.route("/series/:seriesID")
  .get(seriesController.Find)
  .delete(seriesController.Delete)
  .put(seriesController.Update)
  .patch(seriesController.Patch);

router.route("/series/:seriesID/seasons")
  .get(seasonController.GetAll)
  .delete(seasonController.DeleteAll)
  .post(seasonController.Add);
  

router.route("/series/:seriesID/seasons/:seasonID")
  .get(seasonController.Find)
  .delete(seasonController.DeleteSeasonIndex)
  .put(seasonController.Update)
  .patch(seasonController.Patch);

module.exports = router;
