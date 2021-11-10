const config = require('../config');
const router = require('express').Router();
const ConfigModel = require('../models/config');
const StackItemsModel = require('../models/stack-items');
const reactLoader = require('../middlewares/react-loader');
const arrayUtil = require('../utils/array-util');

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
.get('/', reactLoader, function(req, res, next) {
  (async function response(){
    const trophies = await ConfigModel.get('PSN_TROPHIES', true);
    const randomTrophies = arrayUtil.shuffle(trophies).slice(0, 10);

    //render template with data
    res.render('index', {bodyClass: 'index', stackItems: StackItemsModel, trophies: randomTrophies});
  })().catch(err => next(err));
})
.get('/data-policy', reactLoader, function(req, res) {
  res.render('data-policy', {bodyClass: 'data-policy', dataPolicy:config.dataPolicy});
});

module.exports = router;