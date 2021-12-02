const {config} = require('../config');

module.exports = function(req, res, next) {
  if(config.production && !req.secure && config.application.forceSSLRedirection) {
    res.redirect(301, `https://${req.headers.hostname}${req.originalUrl}`);
  } else {
    next();
  }
};