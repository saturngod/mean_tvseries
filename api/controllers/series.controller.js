require("../data/series-model");
const mongoose = require("mongoose");
const Series = mongoose.model(process.env.SERIE_MODEL);
const callbackList = require("../helpers/callback.list");
const handler = require("../helpers/handler");

let offset = process.env.DEFAULT_OFFSET;
let count = process.env.DEFAULT_COUNT;

const GetAll = function (req, res) {
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
    response.message = { error: "Over the count limit" };

  }
  else {
    callbackList.ModelFindAllCallback(Series, offset, count, function (error, series) {
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

const Add = function (req, res) {

  let response = {
    status: 200,
    message: {}
  };

  callbackList.ModelAddCallback(Series, req.body, function (error, series) {
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

const Find = function (req, res) {
  let objectId = req.params.seriesID;

  let response = {
    status: 200,
    message: {}
  };

  callbackList.ModelFindOneCallback(Series, objectId, function (error, series) {
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

const Delete = function (req, res) {

  let objectId = req.params.seriesID;

  let response = {
    status: 200,
    message: {}
  };

  callbackList.ModelDeleteCallback(Series, objectId, function (error, deletedSeries) {

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

const Update = function (req, res) {
  let objectId = req.params.seriesID;

  let response = {
    status: 200,
    message: {}
  };

  const newSeries = {
    title: req.body.title,
    year: req.body.year,
    rate: req.body.rate,
    channel: req.body.channel,
    seasons: req.body.seasons
  };

  callbackList.ModelFindOneCallback(Series, objectId, function (error, series) {
    if (error) {
      response.status = 500;
      response.message = error;
      res.status(response.status).json(response.message);
      return;
    }
    else if (null === series) {
      return handler.handleNotFound(res);
    }
    else {
      series.title = newSeries.title;
      series.year = newSeries.year;
      series.rate = newSeries.rate;
      series.channel = newSeries.channel;
      series.seasons = newSeries.seasons;

      callbackList.ModelSaveCallback(series, function (error, series) {

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



  });
}

const Patch = function (req, res) {
  let objectId = req.params.seriesID;

  let response = {
    status: 200,
    message: {}
  };

  const newSeries = {
    title: req.body.title,
    year: req.body.year,
    rate: req.body.rate,
    channel: req.body.channel,
    seasons: req.body.seasons
  };

  callbackList.ModelFindOneCallback(Series, objectId, function (error, series) {
    if (error) {
      response.status = 500;
      response.message = error;
      res.status(response.status).json(response.message);
      return;
    }
    else if (null === series) {
      return handler.handleNotFound(res);
    }
    else {
      if(undefined != req.body.title) {
        series.title = req.body.title;
      }
      if(undefined != req.body.year) {
        series.year = req.body.year;
      }
      if(undefined != req.body.rate) {
        series.rate = req.body.rate;
      }
      if(undefined != req.body.channel) {
        series.channel = req.body.channel;
      }
      if(undefined != req.body.seasons) {
        if(req.body.seasons.length > 0) {
          series.seasons = req.body.seasons;
        }
      }
      
      callbackList.ModelSaveCallback(series, function (error, series) {

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



  });
}


module.exports = {
  GetAll,
  Add,
  Find,
  Delete,
  Update,
  Patch
}
