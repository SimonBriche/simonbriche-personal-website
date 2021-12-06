const {config} = require('../config');

/*
 * Handle redirection 301 server side
 * Redirect to ENV.REDIRECT_TO_DOMAIN if set
 * Only for production mode
 */
module.exports = function(req, res, next) {
  if(config.production) {
    if(config.application.redirectToDomain && req.hostname !== config.application.redirectToDomain) {
      const protocol = (config.application.forceSSLRedirection) ? 'https' : req.protocol;
      res.redirect(301, `${protocol}://${config.application.redirectToDomain}${req.originalUrl}`);
    } else {
      next();
    }
  } else {
    next();
  }
};