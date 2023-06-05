require("../data/series-model");
const mongoose = require("mongoose");
const Series = mongoose.model(process.env.SERIE_MODEL);
const callbackList = require("../helpers/callback.list");
const handler = require("../helpers/handler");

let offset = process.env.DEFAULT_OFFSET;
let count = process.env.DEFAULT_COUNT;

const GetAll = function(req, res) {
  console.log("GetAll");
  let response = {
    status: 200,
    message: {}
  };

  if (null != req.params.offset) {
    offset = parseInt(req.params.offset);
  }
  if (null != req.params.count) {
    count = parseInt(req.params.count);
  }

  if (count > process.env.DEFAULT_MAX_COUNT) {

    response.status = 400;
    response.message = { error: process.env.OVER_LIMIT_TEXT };

  }
  else {
    callbackList.ModelFindAllCallback(Series, offset, count, function(error, series) {
      if (error) {
        return handler.handlesError(res, error);
      }
      else if (series.length == 0) {
        return handler.handleNotFound(res);
      }
      else {
        response.status = 200;
        response.message = series;
      }

      return handler.handleResponse(res, response);
    });
  }
}

const Add = function(req, res) {

  let response = {
    status: 200,
    message: {}
  };

  callbackList.ModelAddCallback(Series, req.body, function(error, series) {
    if (error) {
      response.status = 500;
      response.message = { error: error };
    }
    else if (series.length == 0) {
      return handler.handleNotFound(res);
    }
    else {
      response.status = 200;
      response.message = series;
    }
    return handler.handleResponse(res, response);
  })
}

const Find = function(req, res) {
  let objectId = req.params.seriesID;

  let response = {
    status: 200,
    message: {}
  };

  callbackList.ModelFindOneCallback(Series, objectId, function(error, series) {
    if (error) {
      response.status = 500;
      response.message = error;
    }
    else if (null === series) {
      return handler.handleNotFound(res);
    }
    else {
      response.status = 200;
      response.message = series;
    }
    return handler.handleResponse(res, response);
  });
}

const Delete = function(req, res) {

  let objectId = req.params.seriesID;

  let response = {
    status: 200,
    message: {}
  };

  callbackList.ModelDeleteCallback(Series, objectId, function(error, deletedSeries) {

    if (error) {
      response.status = 500;
      response.message = error;
    }
    else if (null === deletedSeries) {
      return handler.handleNotFound(res);
    }
    else {
      response.status = 200;
      response.message = deletedSeries;
    }
    res.status(response.status).json(response.message);
  });

}


const _fullUpdate = function(series, req) {
  series.title = req.body.title;
  series.year = req.body.year;
  series.rate = req.body.rate;
  series.channel = req.body.channel;
  series.seasons = req.body.seasons;
}

const _parialUpdate = function(series, req) {
  if (req.body.title) {
    series.title = req.body.title;
  }
  if (req.body.year) {
    series.year = req.body.year;
  }
  if (req.body.rate) {
    series.rate = req.body.rate;
  }
  if (req.body.channel) {
    series.channel = req.body.channel;
  }
  if (req.body.seasons) {
    series.seasons = req.body.seasons;
  }
}

const _update = function(req, res, updateFillingCallback) {

  let objectId = req.params.seriesID;

  let response = {
    status: 200,
    message: {}
  };

  callbackList.ModelFindOneCallback(Series, objectId, function(error, series) {
    if (error) {
      return handler.handlesError(res, error);
    }
    else if (null === series) {
      return handler.handleNotFound(res);
    }
    else {
      updateFillingCallback(series, req);
      _ModelSave(series, res, response);

    }

  });
}

const FullUpdate = function(req, res) {
  _update(req, res, _fillingFullUpdate);
}

const _ModelSave = function(series, res, response) {
  callbackList.ModelSaveCallback(series, function(error, series) {

    if (error) {
      response.status = 500;
      response.message = error;
    }
    else if (null === series) {
      return handler.handleNotFound(res);
    }
    else {
      response.status = 200;
      response.message = series;
    }

    return handler.handleResponse(res, response);

  });
}

const PartialUpdate = function(req, res) {
  _update(req, res, _parialUpdate);
}


module.exports = {
  GetAll,
  Add,
  Find,
  Delete,
  FullUpdate,
  PartialUpdate
}
