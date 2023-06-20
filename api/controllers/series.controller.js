const handler = require("../../helpers/handler");
const seriesService = require("../services/series-service");

const _getSeriesId = function(req) {
  return seriesService.getSeriesIdFromRequest(req);
}

const _getQueryData = function(req) {

  let offset = process.env.DEFAULT_OFFSET;
  let count = process.env.DEFAULT_COUNT;
  let query = "";

  if (null != req.query.count) {
    count = parseInt(req.query.count);
  }

  if (null != req.query.page) {
    let page = parseInt(req.query.page);
    offset = count * (page - 1);
  }

  if (null != req.query.q) {
    query = req.query.q;
  }

  return new Promise((resolve, reject) => {
    if (parseInt(count) > parseInt(process.env.DEFAULT_MAX_COUNT)) {

      reject(process.env.OVER_LIMIT_TEXT);
    }
    else {
      resolve({
        "offset": offset,
        "count": count,
        "query": query
      });
    }
  });
}

const _findSeries = function(queryString) {
  let query = {}
  if (queryString.query != "") {
    query = {
      "title": {
        $regex: queryString.query,
        $options: "i"
      }
    }
  }
  return seriesService.findSeries(query, queryString.offset, queryString.count);
}

const _pageSeries = function() {
  return seriesService.countSeries();
}

const _response = function(res, series) {
  let response = {
    status: 200,
    message: series
  }
  return handler.handleResponse(res, response);
}

const _handleErrorResponse = function(res, errorObject) {
  if (errorObject.status) {
    return handler.handleError(res, errorObject.error, errorObject.status);
  }
  return handler.handleError(res, errorObject);
}

const _seriesValidation = function(newSeries) {
  return seriesService.validateSeries(newSeries);
}

const _addSeries = function(newSeries) {
  return seriesService.addSeries(newSeries);
}

const _findSeriesById = function(seriesID) {
  return seriesService.findSeriesById(seriesID);
}

const _deleteOneSeries = function(seriesID) {
  return seriesService.deleteSeriesById(seriesID);
}

const _validateIsExist = function(series) {
  return new Promise((resolve, reject) => {
    if (null === series) {
      reject({ "error": process.env.RESOURCE_NOT_FOUND_TEXT, "status": 404 })
    }
    else {
      resolve(series);
    }
  });
}

const _findAndUpdate = function(seriesID, series) {
  return seriesService.findSeriesByIdAndUpdate(seriesID, series);
}

const _replaceSeriesById = function(seriesID, newSeries) {
  return seriesService.findSeriesByIdAndReplace(seriesID, newSeries);
}

const findAll = function(req, res) {
  _getQueryData(req)
    .then((queryData) => _findSeries(queryData))
    .then((series) => _response(res, series))
    .catch((error) => _handleErrorResponse(res, error));
}

const add = function(req, res) {
  _seriesValidation(req.body)
    .then((newSeries) => _addSeries(newSeries))
    .then((series) => _response(res, series))
    .catch((error) => _handleErrorResponse(res, error));
}

const findById = function(req, res) {
  const seriesID = _getSeriesId(req);
  _findSeriesById(seriesID)
    .then((series) => _validateIsExist(series))
    .then((series) => _response(res, series))
    .catch((error) => _handleErrorResponse(res, error));
}



const deleteById = function(req, res) {
  const seriesID = _getSeriesId(req);
  _deleteOneSeries(seriesID)
    .then((series) => _validateIsExist(series))
    .then((series) => _response(res, series))
    .catch((error) => _handleErrorResponse(res, error));
}

const partialUpdate = function(req, res) {
  const seriesID = _getSeriesId(req);
  _findAndUpdate(seriesID, req.body)
    .then((series) => _response(res, series))
    .catch((error) => _handleErrorResponse(res, error));
}

const fullUpdate = function(req, res) {
  const seriesID = _getSeriesId(req);
  _replaceSeriesById(seriesID, req.body)
    .then((series) => _response(res, series))
    .catch((error) => _handleErrorResponse(res, error))
}

const _pageInfo = function(req, totalDocuments) {
  let currentPage = 1;
  let count = parseInt(process.env.DEFAULT_COUNT);
  let first = false;
  let last = false;

  if (req.query.page) {
    currentPage = req.query.page;
  }
  if (req.query.count) {
    count = req.query.count;
  }

  let totalPage = Math.ceil(totalDocuments / count);
  if (currentPage == 1) {
    first = true;
  }
  else if (currentPage == totalPage) {
    last = true;
  }

  let response = {
    totalPage,
    first,
    last
  }

  return new Promise((resolve, reject) => {
    resolve(response);
  });

}

const getAllPages = function(req, res) {
  _pageSeries()
    .then((count) => _pageInfo(req, count))
    .then((pageInfo) => _response(res, pageInfo))
    .catch((error) => _handleErrorResponse(res, error));
}


module.exports = {
  findAll,
  add,
  findById,
  deleteById,
  partialUpdate,
  fullUpdate,
  getAllPages
}
