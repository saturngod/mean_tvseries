const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const utils = require("util");

const userService = require("../services/user-service");
const handler = require("../../helpers/handler");


const _getUserWithUsername = function(username) {
  return userService.getUserWithUsername(username);
}

const _validateWithPassword = function(userDB, password) {
  
  return new Promise((resolve, reject) => {
    if (password == "") {
      reject({ "error": process.env.ERR_INVALID_PASSWORD });
    }
    else {
      bcrypt.compare(password, userDB.password).then((login) => {

        if (login) {
          
          resolve(userDB);
        }
        else {
          
          reject({ "error": process.env.ERR_INVALID_REQUEST });
        }

      })
        .catch((error) => {
          console.log(error);
          reject({ "error": process.env.ERR_INVALID_REQUEST });
        });
    }
  })

}

const _response = function(res, status, message) {
  let response = {
    status: status,
    message: message
  }
  return handler.handleResponse(res, response);
}

const _handleErrorResponse = function(res, error) {
  return handler.handleError(res, error);
}

const _validateLoginRequest = function(req) {
  return new Promise((resolve, rejects) => {
    if (req.body && req.body.username && req.body.password) {
      resolve();
    }
    else {
      rejects({ "error": process.env.ERR_INVALID_REQUEST });
    }
  });

}

const _validUserInfo = function(req) {
  return new Promise((resolve, rejects) => {
    if (null != req.body.password && (null == req.body.newPassword || "" == req.body.newPassword.trim())) {
      rejects({ "error": process.env.ERR_INVALID_REQUEST });
    }
    resolve();
  });
}

const _validUserNameRequest = function(req) {
  return new Promise((resolve, rejects) => {

    if (null == req.body.name) {
      rejects({ "error": process.env.ERR_INVALID_REQUEST });
    }
    resolve();

  });
}

const _validateRegisterRequest = function(req) {
  return new Promise((resolve, rejects) => {
    if (req.body && req.body.username && req.body.name && req.body.password) {
      resolve();
    }
    else {
      rejects({ "error": process.env.ERR_MISSING_PARAMETER });
    }
  })

}

const _generate_token = function(username, name) {
  
  const jwtSign = utils.promisify(jwt.sign)
  return jwtSign({ username, name }, process.env.JWT_KEY, { "expiresIn": 50000 })
}

const login = function(req, res) {
  _validateLoginRequest(req)
    .then(() => _getUserWithUsername(req.body.username))
    .then((user) => _validateWithPassword(user, req.body.password))
    .then((user) => _generate_token(user.username, user.name))
    .then((token) => _response(res, 200, { "token": token }))
    .catch((error) => _handleErrorResponse(res, error));
}


const _updatePassword = function(user, password) {
  if (password != "") {
    return userService.updatePassword(user, password);
  }
  else {
    return new Promise((resolve, reject) => {
      reject({ "error": process.env.ERR_CANNOT_UPDATE_PASSWORD });
    })
  }
}

const _updateNameWhenNotEmpty = function(user, name) {
  
  if (null != name && "" != name) {

    user.name = name;
    return user.save();
  }
  else {
    return new Promise((resolve, reject) => {
      resolve(user);
    });
  }

}

_getNewName = function(requestBody) {
  if (requestBody.name) {
    return requestBody.name;
  }
  return "";
}
const partialUpdate = function(req, res) {
  if (req.body.password && req.body.newPassword) {
    const newName = _getNewName(req.body);
    _validUserInfo(req)
      .then(() => _getUserWithUsername(req.body.jwt_username))
      .then((user) => _validateWithPassword(user, req.body.password))
      .then((user) => _updatePassword(user, req.body.newPassword))
      .then((user) => _updateNameWhenNotEmpty(user, newName))
      .then((user) => _generate_token(user.username, user.name))
      .then((token) => _response(res, 200, { "token": token }))
      .catch((error) => _handleErrorResponse(res, error));
  }
  else if (req.body.name) {

    _validUserNameRequest(req)
      .then(() => _getUserWithUsername(req.body.jwt_username))
      .then((user) => _updateNameWhenNotEmpty(user, req.body.name))
      .then((user) => _generate_token(user.username, user.name))
      .then((token) => _response(res, 200, { "token": token }))
      .catch((error) => _handleErrorResponse(res, error));
  }
  else {
    return _handleErrorResponse(res, "failed");
  }
}

const _registerAccount = function(newUser) {
  return userService.createUser(newUser);
}

const register = function(req, res) {
  _validateRegisterRequest(req)
    .then(() => _registerAccount(req.body))
    .then((user) => _generate_token(user.username, user.name))
    .then((token) => _response(res, 200, { "token": token }))
    .catch((error) => _handleErrorResponse(res, error))
}

module.exports = {
  login,
  register,
  partialUpdate
}
