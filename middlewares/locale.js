const {config} = require('../config');

//you MUST choose between domain or subfolder localization strategy, priority to domain strategy.
let localeDomainsCache, localeSubfoldersCache;

const clearLocaleCache = () => {
  localeDomainsCache = undefined;
  localeSubfoldersCache = undefined;
}

const getLocaleInfos = (req) => {
  if(localeDomainsCache === undefined && localeSubfoldersCache === undefined){
    if(typeof config.application.localeDomains === 'string'){
      try{
        localeDomainsCache = JSON.parse(config.application.localeDomains);
        _logger.verbose('localeDomains parsing', localeDomainsCache);
      }
      catch(e){
        _logger.error('Your localeDomains is not a valid JSON with [{"domain":"YOUR_DOMAIN","locale":"lo_lo"}] format. Fix it or delete the ENV.LOCALE_DOMAINS. Your current localeDomains is', config.application.localeDomains);
      }
    }
    else if(typeof config.application.localeSubfolders === 'string'){
      try{
        localeSubfoldersCache = JSON.parse(config.application.localeSubfolders);
        _logger.verbose('localeSubfolders parsing', localeSubfoldersCache);
      }
      catch(e){
        _logger.error('Your localeSubfolders is not a valid JSON with [{"folder":"folder","locale":"lo_lo"}] format. Fix it or delete the ENV.LOCALE_SUBFOLDERS. Your current localeSubfolders is', config.application.localeSubfolders);
      }
    }
    else{
      localeDomainsCache = localeSubfoldersCache = null;
    }
  }

  if(Array.isArray(localeDomainsCache)){
    return localeDomainsCache.find(item => (item.domain === req.hostname));
  }
  else if(Array.isArray(localeSubfoldersCache)){
    const folder = req.path.split("/")[1];
    if(folder){
      return localeSubfoldersCache.find(item => (item.folder === folder));
    }
    else{
      return undefined;
    }
  }
  else{
    return undefined;
  }
}

const middleware = (req, res, next) => {
  //set locale to fr_fr by default
  req.locale = res.locals.locale = 'fr_fr';
  
  const localeInfos = getLocaleInfos(req);
  if(localeInfos){
    req.locale = res.locals.locale = localeInfos.locale;
    req.locale_domain = res.locals.locale_domain = localeInfos.domain;
    if(localeInfos.folder){
      req.locale_subfolder = res.locals.locale_subfolder = localeInfos.folder;
      //set url without the locale folder for the next middlewares or Routers to normalize the routes without the locale
      const folderRegex = new RegExp('^\/'+localeInfos.folder);
      req.url = req.url.replace(folderRegex, "");
      if(req.url.substr(0,1) !== '/'){
        req.url = '/'+req.url;
      }
    }
  }
  
  //load locale dictionary and routemap
  res.locals.routemap = require('../locale/routemap');
  try{
    res.locals.loc = require('../locale/'+req.locale);
  }
  catch(e){
    _logger.error('Unable to find locale files in folder /locale for locale',res.locals.locale);
    res.locals.loc = {};
  }
  next();
}

const localeMiddleware = module.exports = middleware;
localeMiddleware.getLocaleInfos = getLocaleInfos;
localeMiddleware.clearLocaleCache = clearLocaleCache;