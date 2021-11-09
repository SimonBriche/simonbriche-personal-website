const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
  tradeTokenForUser: function(token){
    return new Promise(function(resolve, reject) {
      if(token && token.length > 0){
        jwt.verify(token.split(" ")[1], config.application.graphqlTokenSecret, function(err, decoded) {
          if(err) {
            reject(new Error(err.message));
          } else {
            resolve(decoded.id);
          }
        });
      }
      else{
        reject(new Error('token_missing'))
      }
    });
  }
}