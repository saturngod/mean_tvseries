const handleResponse= function(res,response) {
    res.status(response.status).json(response.message);
}

const handleError= function(res,error,status=500) {
    console.log(error);
    let response = {};
    response.status= status;
    response.message= error;
    handleResponse(res,response);
}

const handleNotFound= function(res) {
    let response = {};
    response.status= 404;
    response.message= {"error" : "not found"};
    handleResponse(res,response);
}

module.exports= {
    handleResponse,
    handleError,
    handleNotFound
}