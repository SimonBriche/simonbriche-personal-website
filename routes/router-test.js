const router = require('express').Router();

//Declare all test routes here
router
//exemple of a localized page, with localized path
.get(['/localisation','/localize'], function(req, res) {
  //the middleware locale has already injected the locale in res.locals.locale and req.locale
  //the locale dictionary is loaded in res.locals.loc
  //inject the `route_id` in the template to have access to the routemap (and localize links)
  //depending of the chosen strategy, the localized page will be accessible under routes :
  //- LOCALE_SUBFOLDER/test/localization
  //- https://LOCALE_DOMAIN/test/localization
  res.render('test/localization', {route_id:"localization"});
})

module.exports = router;