const handleResponse = function (res, response) {
    res.status(response.status).json(response.message);
};

const handlesError = function (res, error) {
    let response = {};
    response.status = 500;
    response.message = { error: error };
    handleResponse(res, response);
};

const handleNotFound = function (res) {
    let response = {};
    response.status = 404;
    response.message = { error: process.env.RESOURCE_NOT_FOUND_TEXT };
    handleResponse(res, response);
};

module.exports = {
    handleResponse,
    handlesError,
    handleNotFound
}