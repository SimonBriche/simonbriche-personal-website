const express = require('express');
const helmet = require('helmet');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');

const config = require('../config');
const graphqlAuth = require('../middlewares/graphql-auth');

const router = express.Router();

//get all the typeDefs (*.graphql files) and merge them
const typesArray = loadFilesSync(__dirname+'/graphql', { extensions: ['graphql'] });
const typeDefs =  mergeTypeDefs(typesArray);

//get all the resolvers (*.resolvers.js files) and merge them
const resolversArray = loadFilesSync(__dirname+"/graphql/*.resolvers.js");
const resolvers = mergeResolvers(resolversArray);

//compile them in an executable schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

router.use(
  graphqlAuth.authentication,
  //accept inline script only for developement graphiql route
  (req, res, next) => {
    if(!config.production){
      helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
          scriptSrc:["'self'","'unsafe-inline'","'unsafe-eval'"]
        }
      })(req, res, next);
    }
    else{
      next();
    }
  },
  graphqlHTTP({
    schema: schema,
    graphiql: (!config.production) ? {headerEditorEnabled: true} : false
  })
);

module.exports = router;