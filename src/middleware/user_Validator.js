const UserModel = require('../models/authModel')

exports.validateUser1 = (body, res, next) => {
    if (body.createdBy !== body.email) {
      return "User permissions error";
    }
    let response
    UserModel.getUserByUsernameExtended(body.email, (err, results) => {
      if (err) {
        response=  "Error getting user by username";
      }
      if (!results) {
        response= "User not found";
      }
      if (results) {
        //console.log("ssss",results)
        response = results;
      }
     
    });
       return response
  };


  exports.validateUser = (body) => {
    return new Promise((resolve, reject) => {
      //console.log("body validate",body)
    if (body.createdBy !== body.email) {
      reject({ error: "User permissions error" });
    }
    UserModel.getUserByUsernameExtended(body.email, (err, results) => {
      if (err) {
        reject({ error: "Error getting user by username" });
      }
      if (!results) {
        reject({ error: "User not found" });
      }
      resolve(results);
    });
  });
};
