const Knex = require('knex');
const { URL } = require('url');
const config = require('../config');

if(config.database && config.database.url){
  const databaseURL = new URL(config.database.url);

  const options = {
    client     : databaseURL.protocol.substring(0, databaseURL.protocol.length - 1),
    connection : {
      host     : databaseURL.hostname,
      port     : databaseURL.port,
      user     : databaseURL.username,
      password : databaseURL.password || '',
      database : databaseURL.pathname.substring(1, databaseURL.pathname.length),
      charset  : 'UTF8MB4',
      collation: 'utf8mb4_0900_ai_ci',
      ssl      : (config.database.useSSL) ? 'Amazon RDS' : false
    },
    useNullAsDefault: true
  };
  const KnexInstance = Knex(options);
  _logger.info(`DB connection created with SSL${(options && options.connection.ssl) ? "enabled":"disabled"}`);
  module.exports = KnexInstance;
}
else{
  _logger.info('no DATABASE_URL detected');
  module.exports = undefined;
}