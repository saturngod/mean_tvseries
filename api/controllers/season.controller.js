require("../data/series-model");
const mongoose = require("mongoose");
const Series = mongoose.model(process.env.SERIE_MODEL);
const callbackList = require("../helpers/callback.list");
const e = require("express");

const GetAll = function (req, res) {

  let response = {
    status: 200,
    message: {}
  };

  let objectId = req.params.seriesID;

  callbackList.ModelFindWithSlectAllCallback(Series, objectId, "seasons", function (error, series) {
    if (error) {
      response.status = 500;
      response.message = { error: error };
    }
    else if (series.length == 0) {
      response.status = 404;
      response.message = { error: "seasons not found" };
    }
    else {
      response.status = 200;
      response.message = series.seasons;
    }
    res.status(response.status).json(response.message);
  });
}

const Find = function (req, res) {
  let response = {
    status: 200,
    message: {}
  };

  let objectId = req.params.seriesID;
  let seasonId = req.params.seasonID;

  callbackList.ModelFindWithSlectAllCallback(Series, objectId, "seasons", function (error, series) {
    if (error) {
      response.status = 500;
      response.message = { error: error };
    }
    else if (series.length == 0) {
      response.status = 404;
      response.message = { error: "seasons not found" };
    }
    else {
      response.status = 200;
      response.message = series.seasons.id(seasonId);
    }
    res.status(response.status).json(response.message);
  });
}

const DeleteSeasonIndex = function (req, res) {
  let response = {
    status: 200,
    message: {}
  };

  let objectId = req.params.seriesID;
  let seasonId = req.params.seasonID;

  callbackList.ModelFindWithSlectAllCallback(Series, objectId, "seasons", function (error, series) {
    if (error) {
      response.status = 500;
      response.message = { error: error };
      res.status(response.status).json(response.message);
      return;
    }
    else if (series.length == 0) {
      response.status = 404;
      response.message = { error: "seasons not found" };
      res.status(response.status).json(response.message);
      return;
    }
    else {
      response.status = 200;
      let deletedFlag = false;
      for(i=0; i < series.seasons.length; i++) {
        if(series.seasons[i]._id == seasonId) {
          series.seasons.splice(i,1);
          deletedFlag = true;
          break;
        }
      }
      if(!deletedFlag) {
        response.status = 404;
        response.message = { error: "seasons not found" };
        res.status(response.status).json(response.message);
        return;
      }

      callbackList.ModelSaveCallback(series, function (error, series) {
        if(error) {
          response.status = 500;
          response.message = { error: error };
        }
        else {
          response.status = 200;
          response.message = {"message":"season deleted"};
        }
        
        res.status(response.status).json(response.message);
      });
      
    }
    
  });
}

const DeleteAll= function (req, res) {
  let response = {
    status: 200,
    message: {}
  };

  let objectId = req.params.seriesID;

  callbackList.ModelFindWithSlectAllCallback(Series, objectId, "seasons", function (error, series) {
    if (error) {
      response.status = 500;
      response.message = { error: error };
      res.status(response.status).json(response.message);
      return;
    }
    else if (series.length == 0) {
      response.status = 404;
      response.message = { error: "seasons not found" };
      res.status(response.status).json(response.message);
      return;
    }
    else {
      response.status = 200;
      series.seasons = [];
      callbackList.ModelSaveCallback(series, function (error, series) {
         if(error) {
          response.status = 500;
          response.message = { error: error };
        }
        else {
          response.status = 200;
          response.message = {"message":"all season deleted"};
        }
        
        res.status(response.status).json(response.message);
      });
      
    }
    
  });
}

const Add = function (req, res) {
  let response = {
    status: 200,
    message: {}
  };

  let objectId = req.params.seriesID;

  callbackList.ModelFindWithSlectAllCallback(Series, objectId, "seasons", function (error, series) {
    if (error) {
      response.status = 500;
      response.message = { error: error };
      res.status(response.status).json(response.message);
      return;
    }
    else if (series.length == 0) {
      response.status = 404;
      response.message = { error: "seasons not found" };
      res.status(response.status).json(response.message);
      return;
    }
    else {
      response.status = 200;
      series.seasons.push(req.body);
      callbackList.ModelSaveCallback(series, function (error, series) {
         if(error) {
          response.status = 500;
          response.message = { error: error };
        }
        else {
          response.status = 200;
          response.message = series;
        }
        
        res.status(response.status).json(response.message);
      });
      
    }
    
  });
}

module.exports = {
  GetAll,
  Find,
  Add,
  DeleteAll,
  DeleteSeasonIndex
}
