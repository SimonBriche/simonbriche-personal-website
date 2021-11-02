const fs = require('fs');
const https = require('https');
const crypto = require("crypto");

const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');

const express = require('express');
const config = require('./config');

const app = express();
const {logger} = require('./utils/log')
if(!global['_logger']){
  global._logger = logger;
}
else{
  logger.error('_logger global variable name not available');
}

//Trust http proxy to work wiht services like Heroku
app.enable('trust proxy');

//Template engine
app.set('view engine', 'pug');

//add http logging
app.use(morgan((config.production) ? 'combined' : 'dev'));

//force HTTPS redirection if needed
app.use(require('./middlewares/https'));

//301 redirection to a specific domain if needed
app.use(require('./middlewares/domain'));

//minimum security for HTTP headers
app.use((req, res, next) => {
  //the "nonce" variable must be set on all inline script tag's "nonce" attribute
  res.locals.nonce = crypto.randomBytes(16).toString("hex");
  next();
}, (req, res, next) => {
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives:{
        //allow here all the js cdn
        scriptSrc:["'self'",'cdn.jsdelivr.net','code.jquery.com',"cdnjs.cloudflare.com","*.google-analytics.com",`'nonce-${res.locals.nonce}'`, config.applicationURL],
        //allow here all the img source
        imgSrc:["'self'", "data:", "*.google-analytics.com", config.applicationURL],
        connectSrc:["'self'", config.applicationURL]
      }
    }
  })(req, res, next);
});

//handle CORS
app.use(cors({
  origin: ['https://lunald.com']
}));

//add compression
app.use(compression());

//store the session information in a cookie named '_session'
app.use(cookieParser(config.cookieSecret));
app.use(session({
  name: '_session',
  httpOnly: true,
  maxAge: null,
  secret: [config.sessionSecret],
  secure: config.forceSSLRedirection
}));

//Routing
//inject the CDN URL in all routes
app.locals.cdnURL = config.cdnURL;

//Routing for public static files
app.use(express.static(__dirname + '/public'));

//declare all public routes
app.use('/', require('./routes/router-public'));
app.use('/', require('./routes/router-test'));
app.use('/graphql', require('./routes/router-graphql'));

//404 (no route has been found)
app.use((req, res, next) => {
 res.status(404).render('404', {url: req.url});
});

//Routing Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  if(req.xhr){
    res.status(500).json({success: false, error: 'internal_server_error'});
  }
  else{
    res.status(500).render('500');
  }
});
app.use((err, req, res, next) => {
  res.status(500).render('500');
});

//create the server and listen to traffic
let server;
if(config.useLocalSSLCert){
  server = https.createServer({
    key: fs.readFileSync('./keys/localhost.key'),
    cert: fs.readFileSync('./keys/localhost.crt')
  }, app).listen(config.port, function() {
    logger.info('Express server listening on port %d in %s mode with local SSL cert', server.address().port, app.settings.env);
  });
}
else{
  server = app.listen(config.port, function() {
    logger.info('Express server listening on port %d in %s mode with managed SSL cert', server.address().port, app.settings.env);
  });
}