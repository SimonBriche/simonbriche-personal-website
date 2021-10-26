const UserModel = require('../models/user');

module.exports = {
  authentication: async function(req, res, next) {
    let authToken = null;
    try {
      authToken = req.headers['authorization'];

      if (authToken) {
        const userId = await UserModel.tradeTokenForUser(authToken);
        console.log('userId obtained', userId)
        req.user = {id: userId};
      }
    } catch (e) {
      console.warn(`Unable to authenticate using auth token: ${authToken}`, e);
    }

    next();
  },
  authenticated: (next) => (root, args, context, info) => {
    if (!context.user) {
      throw new Error(`Unauthenticated`);
    }
    
    return next(root, args, context, info);
  },
  //defining a curried function funciton here
  authorized: (role) => (next) => (root, args, context, info) => {
    console.log('check role ', role);
    
    if (!context.user || context.user.role !== role) {
      throw new Error(`Unauthorized`);
    }
  
    return next(root, args, context, info);
  }
};