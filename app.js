require("dotenv").config();
require("./api/data/db");
require("./api/data/series-model");
require("./api/data/user-model");

const express= require("express");
const bodyParser= require("body-parser");
const corsMW= require("./middleware/cors");
const routes= require("./api/routes");

const app= express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api",corsMW);
app.use("/images",express.static("images"));
app.use("/api",routes);

const server = app.listen(process.env.PORT,function(){
    console.log("Server is runnong on " + server.address().port);
});