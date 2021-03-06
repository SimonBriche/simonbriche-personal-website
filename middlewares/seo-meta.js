const { URL } = require('url');
const Tools = require('../utils/tools');
const SEOMetaModel = require('../models/seo-meta');

module.exports = function(req, res, next) {
  //Use global configuration for meta tags.
  const SEOMetaConfig = Tools.cloneObject(SEOMetaModel)[req.locale];
  const fullUrl = req.protocol + '://' + req.headers.host + req.originalUrl;
  const currentURL = new URL(fullUrl);
  let SEOMeta;
  //get the pathname (without first and trailing slashes) that will reference potential specific meta configuration
  const route = currentURL.pathname.replace(/^\/|\/$/g, '');
  //if a meta exists for that route
  if(SEOMetaConfig[route]){
    //merge specific values with the default values
    SEOMeta = Tools.mergeObjects(SEOMetaConfig, SEOMetaConfig[route]);
    SEOMeta.canonical = SEOMeta.canonical || SEOMetaConfig.base_url+route;
  }
  else{
    SEOMeta = SEOMetaConfig;
    SEOMeta.canonical = SEOMetaConfig.base_url;
  }
  SEOMeta.og.url = fullUrl;
  res.locals.meta = SEOMeta;
  next();
};