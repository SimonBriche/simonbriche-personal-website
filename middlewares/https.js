const config = require('../config');

module.exports = function(req, res, next) {
  const ua = (req.headers && req.headers['user-agent']) ? req.headers['user-agent'].toLowerCase() : undefined;
  _logger.debug('ua', ua)
  if(config.production && !req.secure && config.application.forceSSLRedirection) {
    res.redirect(301, 'https://' + req.headers.host + req.url);
  } else {
    next();
  }
};