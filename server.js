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
const {config} = require('./config');
const {logger} = require('./utils/log');
const ConfigModel = require('./models/config');
const tools = require('./utils/tools');
const MarvelLib = require('./lib/marvel');

const app = express();

//Trust http proxy to work wiht services like Heroku
app.enable('trust proxy');

//Template engine
app.set('view engine', 'pug');

//add http logging
app.use(morgan((config.production) ? 'combined' : 'dev'));

//301 redirection to a specific domain if needed
app.use(require('./middlewares/domain'));

//force HTTPS redirection if needed
app.use(require('./middlewares/https'));

//add compression
app.use(compression());

//handle CORS
app.use(cors({
  origin: ['https://simonbriche.lunald.com','https://simonbriche.dev','https://www.simonbriche.dev']
}));

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
        scriptSrc:["'self'",`'nonce-${res.locals.nonce}'`, config.application.url].concat(config.cspDirectives.scriptSrc),
        //allow here all the img sources
        imgSrc:["'self'", "data:", config.application.url].concat(config.cspDirectives.imgSrc),
        //allow here all the connect sources (ajax/fetch requests)
        connectSrc:["'self'", config.application.url].concat(config.cspDirectives.connectSrc),
        //allow here all the connect sources (ajax/fetch requests)
        frameSrc:["'self'", config.application.url].concat(config.cspDirectives.frameSrc)
      }
    }
  })(req, res, next);
});

//Routing for public static files
app.use(express.static(__dirname + '/public'));

//store the session information in a cookie named '_session'
app.use(cookieParser(config.application.cookieSecret));
app.use(session({
  name: '_session',
  httpOnly: true,
  maxAge: null,
  secret: [config.application.sessionSecret],
  secure: config.application.forceSSLRedirection
}));

//Routing
//inject the CDN URL in all routes
app.locals.cdnURL = config.cdnURL;

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

//handle server events
const serverListeningHandler = () => {
  logger.info(`Express server listening on port ${server.address().port} in ${app.settings.env} mode with ${config.application.useLocalSSLCert ? 'local' : 'managed'} SSL cert`);
  
  if(config.application.keepAwake){
    tools.pingURL(config.application.url, undefined, undefined, config.production, function(err, timeoutId){
      if(err){
        logger.error('Ping application failed', err);
      }
      if(timeoutId){
        logger.verbose('Ping application scheduled with timeoutId', timeoutId);
      }
    });
  }

  if(config.marvel){
    (async () => {
      const marvelAccessToken = {public: config.marvel.publicKey, private: config.marvel.privateKey};
      if(config.marvel.fetchCharacter){
        const marvelCharacter = await MarvelLib.getRandomItem(marvelAccessToken, 'characters', true).catch(e => {
          logger.error('Get Marvel character failed', e);
          return null;
        });
        if(marvelCharacter){
          logger.verbose('Get Marvel character', marvelCharacter);
          await ConfigModel.set('MARVEL_CHARACTER', JSON.stringify(marvelCharacter)).catch(e => logger.error('Save Marvel character failed', e));
        }
      }
      if(config.marvel.fetchComics){
        const marvelComics = await MarvelLib.getRandomItem(marvelAccessToken, 'comics', true).catch(e => {
          logger.error('Get Marvel comics failed', e);
          return null;
        });
        if(marvelComics){
          logger.verbose('Get Marvel comics', marvelComics);
          await ConfigModel.set('MARVEL_COMICS', JSON.stringify(marvelComics)).catch(e => logger.error('Save Marvel comics failed', e));
        }
      }

    })().catch(e => logger.error('Marvel connexion failed', e))
  }
  
  
}
const serverErrorHandler = (e) => {
  logger.error("Express server failed", e);
}

//create the server and listen to traffic
let server;
if(config.application.useLocalSSLCert){
  server = https.createServer({
    key: fs.readFileSync('./keys/localhost.key'),
    cert: fs.readFileSync('./keys/localhost.crt')
  }, app).listen(config.port, serverListeningHandler).on('error', serverErrorHandler);
}
else{
  server = app.listen(config.port, serverListeningHandler).on('error', serverErrorHandler);
}