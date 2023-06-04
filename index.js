require("dotenv").config();
require("./api/data/db");

const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./api/routes")

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", routes);

const server = app.listen(process.env.PORT, function() {
  console.log("Sever is running on http://localhost:" + server.address().port);
});
