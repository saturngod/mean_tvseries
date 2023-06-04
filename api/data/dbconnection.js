const callbackify = require("util").callbackify;

let MongoClientCallback = callbackify(function(url) {
  return MongoClient.connect(url);
});

let _connection = null;
const MongoClient = require("mongodb").MongoClient;
const open= function() {
  console.log("START DB CONNECTION");
  if (null === get()) {
    MongoClientCallback(process.env.DB_URL, function(err, client) {
      console.log("CONNECT MONGODB");
      if (err) {
        console.log(err);
      }
      else {
        console.log("CONNECTED");
        _connection = client.db(process.env.DB_NAME);
      }
    });
  }
}

const get= function() {
  console.log("CONNECTION");
  return _connection;
}

module.exports = {
  open,
  get
}
