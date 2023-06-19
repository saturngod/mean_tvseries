const mongoose= require("mongoose");

const userSchema= mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

mongoose.model(process.env.USER_MODEL,userSchema,process.env.USER_COLLECTION);