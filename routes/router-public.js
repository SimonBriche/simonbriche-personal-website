const router = require('express').Router();

function r(route) {
  // just a require wrapper
  return require('./public/' + route);
}

//set the locale
router.use(require('../middlewares/locale'));
//inject SEO meta to all public routes
router.use(require('../middlewares/seo-meta'));
//show only SEO meta for crawlers
router.use(require('../middlewares/og-only'));

//Declare all public routes here
router
.get('/', function(req, res) {
  res.render('index', {bodyClass: 'index'});
});

module.exports = router;