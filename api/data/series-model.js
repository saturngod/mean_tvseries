const mongoose = require("mongoose");

const episodeSchema = mongoose.Schema({
    "episode_number": {
        "type": "Number"
    },
    "name": {
        "type": "String"
    },
    "overview": {
        "type": "String"
    },
    "image": {
        "type": "String"
    }
});

const seasonSchema = mongoose.Schema({

    "air_date": {
        "type": "Date"
    },
    "name": {
        "type": "String"
    },
    "overview": {
        "type": "String"
    },
    "poster_path": {
        "type": "String"
    },
    "season_number": {
        "type": "Number"
    },
    "episodes": {
        "type":[episodeSchema]
        
    }
});

const seriesSchema = mongoose.Schema({

    "title": {
        "type": "String"
    },
    "first_air_date": {
        "type": "Date"
    },
    "last_air_date": {
        "type": "Date"
    },
    "description": {
        "type": "String"
    },
    "popularity": {
        "type": "Number"
    },
    "number_of_seasons": {
        "type": "Number"
    },
    "production": {
        "type": "String"
    },
    "origin_country": {
        "type":"String"
    },
    "rate": {
        "type": "Number"
    },
    "backdrop": {
        "type": "String"
    },
    "poster": {
        "type": "String"
    },
    "genres": {
        "type": [
            "String"
        ]
    },
    "seasons": {
        "type": [
            seasonSchema
        ]
    }
});

mongoose.model(process.env.SERIES_MODEL, seriesSchema, process.env.SERIES_COLLECTION);