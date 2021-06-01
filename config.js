const ENV = process.env;

module.exports = {
  port: ENV.PORT,
  production: (ENV.NODE_ENV === 'production'),
  sessionSecret: ENV.SESSION_SECRET,
  cookieSecret: ENV.COOKIE_SECRET,

  useLocalSSLCert: (ENV.USE_LOCAL_SSL_CERT) ? (ENV.USE_LOCAL_SSL_CERT === "true") : false
}