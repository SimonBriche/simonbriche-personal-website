const config = require('../config');

/*
 * Handle redirection 301 server side
 * Redirect to ENV.DOMAIN if set
 * Only for production mode
 */
module.exports = function(req, res, next) {
  if(config.production) {
    if(config.domain && req.hostname !== config.domain) {
      res.redirect(301, ((config.forceSSL) ? 'https://' : (req.protocol+'://')) + config.domain + req.originalUrl);
    } else {
      next();
    }
  } else {
    next();
  }
};