const fs = require('fs');
const https = require('https');
const config = require('./config');

const express = require('express');
const app = express();
let server;

if(config.useLocalSSLCert){
  server = https.createServer({
    key: fs.readFileSync('./keys/localhost.key'),
    cert: fs.readFileSync('./keys/localhost.crt')
  }, app).listen(config.port, function() {
    console.log('Express server listening on port %d in %s mode with https', server.address().port, app.settings.env);
  });
}
else{
  server = app.listen(config.port, function() {
    console.log('Express server listening on port %d in %s mode with http', server.address().port, app.settings.env);
  });
}

//Trust http proxy to work wiht services like Heroku
app.enable('trust proxy');

//Template engine
app.set('view engine', 'pug');

//Routing
app.use('/', require('./routes/router-public'));

//Routing for static files
app.use(express.static(__dirname + '/public'));

//404 (no route has been found)
app.use(function(req, res, next){
 res.status(404).render('404', {url: req.url});
});

//Routing Error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  if(req.xhr){
    res.status(500).json({success: false, error: 'internal_server_error'});
  }
  else{
    res.status(500).render('500');
  }
});
app.use(function(err, req, res, next) {
  res.status(500).render('500');
});