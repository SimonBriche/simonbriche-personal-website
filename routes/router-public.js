const router = require('express').Router();

function r(route) {
  // just a require wrapper
  return require('./public/' + route);
}

//Declare all public routes here
router
.get('/', function(req, res) {
  res.render('index', {bodyClass: 'index'});
});

module.exports = router;