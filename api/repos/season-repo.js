const getSeasonIdFromRequest= function(req) {
    return req.params.seasonID;
}

const getAllSeasonOfSeries= function(series) {
    return series.seasons;
}

const findBySeasonId= function(series,seasonID) {
    return new Promise((resolve,reject) => {
        resolve(series.seasons.id(seasonID));
    });
}

module.exports= {
    getSeasonIdFromRequest,
    getAllSeasonOfSeries,
    findBySeasonId
}