const mongoose= require("mongoose");
const Series = mongoose.model(process.env.SERIES_MODEL)

const getSeriesIdFromRequest= function (req) {
    return req.params.seriesID;
}

const findSeries= function(query,offset,limit) {
    return Series.find(query,'_id title first_air_date rate poster').skip(offset).limit(limit).exec();
}

const countSeries= function() {
    return Series.countDocuments();
}

const addSeries= function(newSeries) {
    return Series.create(newSeries);
}

const findSeriesById= function(seriesID) {
    return Series.findById(seriesID).exec();
}

const deleteSeriesById= function(seriesID) {
    return Series.findByIdAndDelete(seriesID).exec();
}

const findSeriesByIdAndUpdate= function(seriesID,series) {
    return Series.findByIdAndUpdate(seriesID,series).exec();
}

const findSeriesByIdAndReplace= function(seriesID,newSeries) {
    
        return this.findSeriesById(seriesID)
        .then((series)=> {
            series.title = newSeries.title;
            series.year = newSeries.year;
            series.rate = newSeries.rate;
            series.channel = newSeries.channel;
            series.seasons = newSeries.seasons;
            return series.save()
        });
        
}

const validateSeries= function(newSeries) {
    return new Promise((resolve, reject) => {
        Series.validate(newSeries).then(() => {
            console.log("SUCCESS");
            resolve(newSeries);
        })
            .catch((error) => {
                console.log("FIRE ERROR");
                reject(error);
            });
    });
}

module.exports= {
    getSeriesIdFromRequest,
    findSeries,
    addSeries,
    findSeriesById,
    deleteSeriesById,
    findSeriesByIdAndUpdate,
    findSeriesByIdAndReplace,
    validateSeries,
    countSeries
}