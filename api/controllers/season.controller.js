const handler = require("../../helpers/handler")
const seriesRepo = require("../repos/series-repo")
const seasonRepo = require("../repos/season-repo");

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
    return seriesRepo.getSeriesIdFromRequest(req);
}

const _findBySeriesId = function (seriesID) {
    return seriesRepo.findSeriesById(seriesID);
}

const _getAllSeasonOfSeries = function (series) {
    return seasonRepo.getAllSeasonOfSeries(series);
}



const _findBySeasonId = function (series, seasonID) {
    return seasonRepo.findBySeasonId(series, seasonID);
}


const findAll = function (req, res) {
    const seriesID = _getSeriesId(req);
    _findBySeriesId(seriesID)
        .then((series) => _getAllSeasonOfSeries(series))
        .then((season) => _responseSeason(res, season))
        .catch((error) => _handleErrorResponse(res, error))
}


const _getSeasonIDFromRequest = function (req) {
    return seasonRepo.getSeasonIdFromRequest(req);
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
