const express = require("express");
const router = express.Router();

const seriesController = require("../controllers/series.controller");
const episodeController= require("../controllers/episode.controller");
const authController = require("../controllers/auth.controller");

router.route("/")
  .get(seriesController.findAll)
  .post(authController.auth, seriesController.add);

router.route("/search")
  .get(seriesController.findAll);

router.route("/pages")
  .get(seriesController.getAllPages);

router.route("/:seriesID")
  .get(seriesController.findById)
  .delete(authController.auth, seriesController.deleteById)
  .patch(authController.auth, seriesController.partialUpdate)
  .put(authController.auth, seriesController.fullUpdate);

router.route("/:seriesID/seasons/:seasonIndex/episodes/:episodeIndex")
.delete(authController.auth, episodeController.deleteEpisode)

router.route("/:seriesID/seasons/:seasonIndex/episodes/:episodeIndex/edit")
.patch(authController.auth, episodeController.updateEpisode)

module.exports = router;
