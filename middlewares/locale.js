const config = require('../config');

//you MUST choose between domain or subfolder localization strategy
let localeDomains = config.localeDomains;
let localeSubfolders = config.localeSubfolders;

if(localeDomains !== null){
  if(typeof localeDomains === 'string'){
    try{
      localeDomains = JSON.parse(localeDomains);
      _logger.verbose('localeDomains parsing', localeDomains);
    }
    catch(e){
      _logger.error('Your localeDomains is not a valid JSON with [{"domain":"YOUR_DOMAIN","locale":"lo_lo"}] format. Fix it or delete the ENV.LOCALE_DOMAINS. Your current localeDomains is',localeDomains);
    }
  }
}
else if(typeof localeSubfolders === 'string'){
  try{
    localeSubfolders = JSON.parse(localeSubfolders);
    _logger.verbose('localeSubfolders parsing', localeSubfolders);
  }
  catch(e){
    _logger.error('Your localeSubfolders is not a valid JSON with [{"folder":"folder","locale":"lo_lo"}] format. Fix it or delete the ENV.LOCALE_SUBFOLDERS. Your current localeSubfolders is',localeSubfolders);
  }
}

//Set the locale depending on the domain or the subfolder
module.exports = function(req, res, next) {
  //set locale to fr_fr by default
  req.locale = res.locals.locale = 'fr_fr';

  if(Array.isArray(localeDomains)){
    localeDomains.every(item => {
      if(item.domain === req.hostname){
        req.locale = res.locals.locale = item.locale;
        req.locale_domain = res.locals.locale_domain = item.domain;
        return false;
      }
      else{
        return true;
      }
    });
  }
  else if(Array.isArray(localeSubfolders)){
    const folders = req.path.split("/");
    if(folders[1]){
      localeSubfolders.every(item => {
        if(item.folder === folders[1]){
          req.locale = res.locals.locale = item.locale;
          req.locale_subfolder = res.locals.locale_subfolder = item.folder;
          //set url without the locale folder for the next middlewares or Routers
          const folderRegex = new RegExp('^\/'+item.folder);
          
          req.url = req.url.replace(folderRegex, "");
          if(req.url.substr(0,1) !== '/'){
            req.url = '/'+req.url;
          }
          return false;
        }
        else{
          return true;
        }
      });
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
};