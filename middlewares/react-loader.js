const fs = require('fs');
const config = require('../config');

let indexHTML, ReactCSS, ReactJS;

const load = () => {
  try {
    indexHTML = fs.readFileSync(__dirname + `/../public/react-cmp/${config.react.environment}/index.html`, "utf8");
  } catch (e) {
    _logger.error("indexHTML loading failed", e);
  }
  
  if(indexHTML && indexHTML.length > 0){
    //we assume that all the files under the static folder are specific to our components
    const reactCSSRegexp = new RegExp(`<link href="${config.react.publicURL}\/static\/css\/(.*?)\.css" rel="stylesheet">`, "gm");
    const reactJSRegexp = new RegExp(`<script src="${config.react.publicURL}\/static\/js\/(.*?)\.js"><\/script>`, "gm");
    
    //grab all the css tags
    ReactCSS = [].concat(indexHTML.match(reactCSSRegexp)).join('');
    //grab all the js tags
    ReactJS = [].concat(indexHTML.match(reactJSRegexp)).join('');
  }
}

load();

module.exports = function(req, res, next) {
  if(!config.production){
    load();
  }
  console.log('load CSS files', ReactCSS)
  console.log('load JS files', ReactJS)
  res.locals.reactApp = {
    css: ReactCSS,
    js: ReactJS
  }
  next();
};