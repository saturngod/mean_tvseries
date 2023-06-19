CORS = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTION");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization,X-Request-With");
  next();
}

module.exports = CORS;
