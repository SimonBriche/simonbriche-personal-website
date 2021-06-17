module.exports = function(req, res, next) {
  const ua = (req.headers && req.headers['user-agent']) ? req.headers['user-agent'] : undefined;
  const forceMetaOnly = (req.query.meta_only === '1');

  if(forceMetaOnly || (ua && ua.match(/^(facebook|twitter|linkedin|facebot|whatsapp)/gi))){
    res.render('og-only');
  }
  else{
    next();
  }
};