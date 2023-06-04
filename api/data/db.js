const mongoose = require("mongoose");
const callbackify = require("util").callbackify;

MongooseDisconnectCallback = callbackify(mongoose.disconnect);

mongoose.connect(process.env.DB_PATH + "/" + process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", function () {
    console.log("Mongose connected to " + process.env.DB_NAME);
});

mongoose.connection.on("disconnected", function () {
    console.log("Mongoose disconnected");
});

mongoose.connection.on("error", function (err) {
    console.log("Mongoose connection error " + err);
});

process.on("SIGINT", function () {
    MongooseDisconnectCallback(function () {
        console.log(process.env.SIGINT_MESSAGE);
        process.exit(0);
    });
});

process.on("SIGTERM", function () {
    MongooseDisconnectCallback(function () {
        console.log(process.env.SIGTERM_MESSAGE);
        process.exit(0);
    });
});

process.once("SIGUSR2", function () {
    MongooseDisconnectCallback(function () {
        console.log(process.env.SIGUSR2_MESSAGE);
        process.kill(process.pid, "SIGUSR2");
    });
});