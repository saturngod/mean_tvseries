const mongoose= require("mongoose");
const User= mongoose.model(process.env.USER_MODEL);
const bcrypt = require("bcrypt");

const getUserWithUsername= function(username) {
    return User.findOne({"username": username}).exec();
}

const _generateSalt = function() {
    return bcrypt.genSalt(10);
}

const _hashPassword = function(password,salt) {
    
    return bcrypt.hash(password.toString(),salt);
}

const _fillPassword= function(newUser, password) {
    return new Promise((resolve,reject) => {
        newUser.password = password;
        resolve(newUser);
    });
}
const _createNewUser= function(newUserWithHashPassword) {
    return User.create(newUserWithHashPassword)
}
const _saveUser= function(user) {
    return user.save();
}
const createUser= function(newUser) {
    return _generateSalt()
    .then ((salt) => _hashPassword(newUser.password,salt))
    .then((newPassword) => _fillPassword(newUser,newPassword))
    .then((newUserWithHashPassword) => _createNewUser(newUserWithHashPassword));   
}

const updatePassword= function(user,password) {
    return _generateSalt()
    .then ((salt) => _hashPassword(password,salt))
    .then((newPassword) => _fillPassword(user,newPassword))
    .then((newUserWithHashPassword) => _saveUser(newUserWithHashPassword));
}



module.exports= {
    getUserWithUsername,
    createUser,
    updatePassword
}