module.exports = function(req, res, next) {
  //set locale to fr_fr by default
  req.locale = res.locals.locale = 'fr_fr';
  next();
}