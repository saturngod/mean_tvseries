require("../data/series-model");
const mongoose = require("mongoose");
const Series = mongoose.model(process.env.SERIE_MODEL);
const callbackList = require("../helpers/callback.list");

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


const Update= function (req, res) {
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
        
        res.status(response.status).json(response.message);
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
      let newSeason = req.body;
      console.log(seasonId);
      console.log(newSeason.episodes);

      let currentSeason = series.seasons.id(seasonId);
      console.log(currentSeason);
      if(currentSeason == null) {
        response.status = 404;
        response.message = { error: "seasons not found" };
        res.status(response.status).json(response.message);
        return;
      }
      if(undefined != newSeason.name) {
        currentSeason.name = newSeason.name;
      }
      if(undefined != newSeason.episodes) {
        console.log(newSeason.episodes);
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
  DeleteSeasonIndex,
  Update,
  Patch
}
