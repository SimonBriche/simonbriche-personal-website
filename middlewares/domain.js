const config = require('../config');

/*
 * Handle redirection 301 server side
 * Redirect to ENV.REDIRECT_TO_DOMAIN if set
 * Only for production mode
 */
module.exports = function(req, res, next) {
  if(config.production) {
    if(config.redirectToDomain && req.hostname !== config.redirectToDomain) {
      res.redirect(301, ((config.forceSSL) ? 'https://' : (req.protocol+'://')) + config.redirectToDomain + req.originalUrl);
    } else {
      next();
    }
  } else {
    next();
  }
};