const ENV = process.env;

module.exports = {
  port: ENV.PORT,
  production: (ENV.NODE_ENV === 'production'),
  logLevel: (ENV.LOG_LEVEL) ? ENV.LOG_LEVEL : ((ENV.NODE_ENV === 'production') ? 'info' : 'debug'),
  cdnURL: (ENV.CDN_URL) ? ENV.CDN_URL : "",
  
  application: {
    url: ENV.APPLICATION_URL,

    sessionSecret: ENV.SESSION_SECRET,
    cookieSecret: ENV.COOKIE_SECRET,
    graphqlTokenSecret: ENV.GRAPHQL_TOKEN_SECRET,

    useLocalSSLCert: (ENV.USE_LOCAL_SSL_CERT) ? (ENV.USE_LOCAL_SSL_CERT === "true") : false,
    forceSSLRedirection: (ENV.FORCE_SSL_REDIRECTION) ? (ENV.FORCE_SSL_REDIRECTION === "true") : true,
    redirectToDomain: (ENV.REDIRECT_TO_DOMAIN) ? ENV.REDIRECT_TO_DOMAIN : null,
    localeDomains: (ENV.LOCALE_DOMAINS) ? ENV.LOCALE_DOMAINS : null,
    localeSubfolders: (ENV.LOCALE_SUBFOLDERS) ? ENV.LOCALE_SUBFOLDERS : null,

    shareCacheVersion: (ENV.SHARE_CACHE_VERSION) ? ENV.SHARE_CACHE_VERSION : 1,
    keepAwake: (ENV.KEEP_AWAKE) ? (ENV.KEEP_AWAKE === "true") : false
  },
  database:{
    url: ENV.DATABASE_URL,
    useSSL: (ENV.DATABASE_USE_SSL !== 'false'),
  },
  react:{
    environment: (ENV.REACT_ENVIRONMENT) ? ENV.REACT_ENVIRONMENT : "production",
    publicURL: ENV.REACT_PUBLIC_URL
  },
  dataPolicy:{
    "fr_fr":{
      companyName: "Simon BRICHE",
      websiteUrl: "http://sbriche.free.fr/",
      dpoEmail: "sbriche@free.fr",
      privacyPolicyUrl: "",
      companyContactEmail: "sbriche@free.fr",
      companyAddress:"",
    },
    "en_en":{
      companyName: "Simon BRICHE",
      websiteUrl: "http://sbriche.free.fr/",
      dpoEmail: "sbriche@free.fr",
      privacyPolicyUrl: "",
      companyContactEmail: "sbriche@free.fr",
      companyAddress:"",
    },
    stats:{
      active: true,
      isGoogleAnalytics: true,
      isGTM: false
    },
    social:{
      active: false,
      isFacebook: true,
      isTwitter: true,
    },
    marketing:{
      active: false,
      isFacebookPixel: true,
      isLinkedInPixel: true,
      isGoogleAdwordsRemarketing: true
    }
  },
  mail:{
    active: (ENV.ACTIVE_MAIL) ? (ENV.ACTIVE_MAIL === "true") : true,
    supportEmail: ENV.SUPPORT_EMAIL,
    smtpLogin: ENV.MAILGUN_SMTP_LOGIN,
    smtpPassword: ENV.MAILGUN_SMTP_PASSWORD,
    host: ENV.MAILGUN_SMTP_SERVER
  },
  cspDirectives: {
    scriptSrc: [
      'code.jquery.com',
      'https://cdn.jsdelivr.net/npm/',
      'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/',
      '*.google-analytics.com'
    ],
    imgSrc: ["*.google-analytics.com"],
    connectSrc: [],
  }
}