const ENV = process.env;

module.exports = {
  port: ENV.PORT,
  production: (ENV.NODE_ENV === 'production'),
  logLevel: (ENV.LOG_LEVEL) ? ENV.LOG_LEVEL : ((ENV.NODE_ENV === 'production') ? 'info' : 'debug'),
  sessionSecret: ENV.SESSION_SECRET,
  cookieSecret: ENV.COOKIE_SECRET,

  database:{
    url: ENV.DATABASE_URL,
    useSSL: (ENV.DATABASE_USE_SSL !== 'false'),
  },
  graphqlTokenSecret: ENV.GRAPHQL_TOKEN_SECRET,
  
  useLocalSSLCert: (ENV.USE_LOCAL_SSL_CERT) ? (ENV.USE_LOCAL_SSL_CERT === "true") : false,
  forceSSLRedirection: (ENV.FORCE_SSL_REDIRECTION) ? (ENV.FORCE_SSL_REDIRECTION === "true") : true,
  domain: (ENV.DOMAIN) ? ENV.DOMAIN : null,
  localeDomains: (ENV.LOCALE_DOMAINS) ? ENV.LOCALE_DOMAINS : null,
  localeSubfolders: (ENV.LOCALE_SUBFOLDERS) ? ENV.LOCALE_SUBFOLDERS : null,
  
  cdnURL: (ENV.CDN_URL) ? ENV.CDN_URL : "",
  shareCacheVersion: (ENV.SHARE_CACHE_VERSION) ? ENV.SHARE_CACHE_VERSION : 1,
  react:{
    environment: (ENV.REACT_ENVIRONMENT) ? ENV.REACT_ENVIRONMENT : "production",
    publicURL: ENV.REACT_PUBLIC_URL
  }
}