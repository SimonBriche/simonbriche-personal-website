const {config} = require('../config');

module.exports = function(req, res, next) {
  res.locals.reactPublicURL = config.react.publicURL;
  next();
};