const config = require('../config');
const router = require('express').Router();
const stackItems = require('../models/stack-items');
const reactLoader = require('../middlewares/react-loader');

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
.get('/', reactLoader, function(req, res) {
  (async function response(){
    //render template with data
    res.render('index', {bodyClass: 'index', stackItems:stackItems});
  })().catch(err => next(err));
})
.get('/data-policy', reactLoader, function(req, res) {
  res.render('data-policy', {bodyClass: 'data-policy', dataPolicy:config.dataPolicy});
});

module.exports = router;