const mongoose = require("mongoose");

const episodeSchema = mongoose.Schema({
    episode_number: {
        type:Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    image: String
});

const seasonSchema = mongoose.Schema({
    air_date : String,
    name: String,
    overview: String,
    poster_path: String,
    season_number: Number,
    episodes: [episodeSchema]
});

const seriesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    first_air_date: String,
    last_air_date: String,
    description: String,
    popularity: Number,
    number_of_seasons: Number,
    production: String,
    origin_country: String,
    rate: Number,
    backdrop: String,
    poster: String,
    genres: [String],
    seasons:  [seasonSchema]
});

mongoose.model(process.env.SERIES_MODEL, seriesSchema, process.env.SERIES_COLLECTION);