const mongoose= require("mongoose");


const EpisodeSchema= mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String
});

const SeasonSchema= mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: Number,
    episodes: [EpisodeSchema]
});

const seriesSchema= mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: Number,
    rate: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    channel: String,
    seasons: [SeasonSchema],
});

mongoose.model(process.env.SERIE_MODEL,seriesSchema,process.env.SERIES_COLLECTION);
