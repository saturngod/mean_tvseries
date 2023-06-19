const handler = require("../../helpers/handler")
const seriesService = require("../services/series-service")
const seasonService = require("../services/season-service");

const _handleErrorResponse = function (res, errorObject) {
    if (errorObject.status) {
        return handler.handleError(res, errorObject.error, errorObject.status);
    }
    return handler.handleError(res, errorObject);
}

const _responseSeason = function (res, season) {
    let response = {
        status: 200,
        message: season
    }
    return handler.handleResponse(res, response);
}

const _getSeriesId = function (req) {
    return seriesService.getSeriesIdFromRequest(req);
}

const _findBySeriesId = function (seriesID) {
    return seriesService.findSeriesById(seriesID);
}

const _getAllSeasonOfSeries = function (series) {
    return seasonService.getAllSeasonOfSeries(series);
}



const _findBySeasonId = function (series, seasonID) {
    return seasonService.findBySeasonId(series, seasonID);
}


const findAll = function (req, res) {
    const seriesID = _getSeriesId(req);
    _findBySeriesId(seriesID)
        .then((series) => _getAllSeasonOfSeries(series))
        .then((season) => _responseSeason(res, season))
        .catch((error) => _handleErrorResponse(res, error))
}


const _getSeasonIDFromRequest = function (req) {
    return seasonService.getSeasonIdFromRequest(req);
}

const findById = function (req, res) {
    const seasonID = _getSeasonIDFromRequest(req);
    const seriesID = _getSeriesId(req);
    _findBySeriesId(seriesID)
        .then((series) => _findBySeasonId(series, seasonID))
        .then((season) => _responseSeason(res, season))
        .catch((error) => _handleErrorResponse(res, error));
}

module.exports = {
    findAll,
    findById
}
