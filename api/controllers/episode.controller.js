const handler = require("../../helpers/handler");
const seriesService = require("../services/series-service");

const _getSeriesId = function (req) {
    return seriesService.getSeriesIdFromRequest(req);
}

const _getEpisodeIndex = function (req) {
    return req.params.episodeIndex;
}

const _getSeasonIndex = function (req) {
    return req.params.seasonIndex;
}

const _deleteEpisode = function (series, seasonIndex, episodeIndex) {
    return seriesService.deleteEpisode(series, seasonIndex, episodeIndex);
}

const _response = function (res, series) {
    let response = {
        status: 200,
        message: series
    }
    return handler.handleResponse(res, response);
}

const _handleErrorResponse = function (res, errorObject) {
    if (errorObject.status) {
        return handler.handleError(res, errorObject.error, errorObject.status);
    }
    return handler.handleError(res, errorObject);
}

const _findSeriesById = function (req, seriesID) {
    return seriesService.findSeriesById(seriesID, false);
}

const deleteEpisode = function (req, res) {

    const seriesID = _getSeriesId(req);
    const episodeIndex = _getEpisodeIndex(req);
    const seasonIndex = _getSeasonIndex(req);

    _findSeriesById(req, seriesID)
        .then((series) => _deleteEpisode(series, seasonIndex, episodeIndex))
        .then((series) => _response(res, series))
        .catch((error) => _handleErrorResponse(res, error));
}

const _updateEpisodeData = function (series, seasonIndex, episodeIndex, body) {
    return seriesService.updateEpisodeData(series, seasonIndex, episodeIndex, body);
}

const updateEpisode = function (req, res) {
    const seriesID = _getSeriesId(req);
    const episodeIndex = _getEpisodeIndex(req);
    const seasonIndex = _getSeasonIndex(req);

    _findSeriesById(req, seriesID)
        .then((series) => _updateEpisodeData(series, seasonIndex, episodeIndex, req.body))
        .then((series) => _response(res, series))
        .catch((error) => _handleErrorResponse(res, error));
}

module.exports = {
    deleteEpisode,
    updateEpisode
}