require("../data/series-model");
const mongoose = require("mongoose");
const Series = mongoose.model(process.env.SERIE_MODEL);
const callbackList = require("../helpers/callback.list");
const handler = require("../helpers/handler");


const GetAll = function (req, res) {

  let response = {
    status: 200,
    message: {}
  };

  let objectId = req.params.seriesID;

  callbackList.ModelFindWithSlectAllCallback(Series, objectId, "seasons", function (error, series) {
    if (error) {
      return handler.handlesError(res, error);
    }
    else if (series.length == 0) {
      return handler.handleNotFound(res);
    }
    else {
      response.status = 200;
      response.message = series.seasons;
    }
    return handler.handleResponse(res, response);
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
      return handler.handlesError(res, error);
    }
    else if (series.length == 0) {
      return handler.handleNotFound(res);
    }
    else {
      response.status = 200;
      const season = series.seasons.id(seasonId);
      if(null === season) {
        return handler.handleNotFound(res);
      }
      response.message = series.seasons.id(seasonId);
    }
    return handler.handleResponse(res, response);
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
      return handler.handlesError(res, error);
    }
    else if (series.length == 0) {
      return handler.handleNotFound(res);
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
        return handler.handleNotFound(res);
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
        
        return handler.handleResponse(res, response);
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
      return handler.handlesError(res, error);
    }
    else if (series.length == 0) {
      return handler.handleNotFound(res);
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
        
        return handler.handleResponse(res, response);
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
      return handler.handlesError(res, error);
    }
    else if (series.length == 0) {
      return handler.handleNotFound(res);
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
        
        return handler.handleResponse(res, response);
      });
      
    }
    
  });
}


const Update= function (req, res) {
  let response = {
    status: 200,
    message: {}
  };

  let objectId = req.params.seriesID;
  let seasonId = req.params.seasonID;

  callbackList.ModelFindWithSlectAllCallback(Series, objectId, "seasons", function (error, series) {
    if (error) {
      return handler.handlesError(res, error);
    }
    else if (series.length == 0) {
      return handler.handleNotFound(res);
    }
    else {
      response.status = 200;
      for (let index = 0; index < series.seasons.length; index++) {
        const season = series.seasons[index];
        if(season._id == seasonId) {
          series.seasons[index] = req.body;
          break;
        }
      }
      callbackList.ModelSaveCallback(series, function (error, series) {
        if(error) {
          response.status = 500;
          response.message = { error: error };
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

const Patch= function (req, res) {
  let response = {
    status: 200,
    message: {}
  };

  let objectId = req.params.seriesID;
  let seasonId = req.params.seasonID;

  callbackList.ModelFindWithSlectAllCallback(Series, objectId, "seasons", function (error, series) {
    if (error) {
      return handler.handlesError(res, error);
    }
    else if (series.length == 0) {
      return handler.handleNotFound(res);
    }
    else {
      response.status = 200;
      let newSeason = req.body;

      let currentSeason = series.seasons.id(seasonId);
      
      if(currentSeason == null) {
        return handler.handleNotFound(res);
      }
      if(undefined != newSeason.name) {
        currentSeason.name = newSeason.name;
      }
      if(undefined != newSeason.episodes) {
        currentSeason.episodes = newSeason.episodes;
      }
      if(undefined != newSeason.year) {
        currentSeason.year = newSeason.year;
      }

      for (let index = 0; index < series.seasons.length; index++) {
        const season = series.seasons[index];
        if(season._id == seasonId) {
          series.seasons[index] = currentSeason;
          break;
        }
      }

      callbackList.ModelSaveCallback(series, function (error, series) {
        if(error) {
          response.status = 500;
          response.message = { error: error };
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
  Find,
  Add,
  DeleteAll,
  DeleteSeasonIndex,
  Update,
  Patch
}
