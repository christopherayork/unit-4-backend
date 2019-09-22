const jwt = require('jsonwebtoken');
const secrets = require('./secrets');
const userDB = require('../users/users-model');

const authUser = (req, res, next) => {
  let auth = req.headers.token;
  if(!auth) res.status(400).json({ message: 'Token required' });
  else {
    jwt.verify(auth, secrets.jwtSecret, async (err, decodedToken) => {
      let identity;
      //assignment is intentional
      if(err || !(identity = await userDB.verifyToken(auth))) res.status(400).json({ message: 'Invalid token' });
      else {
        req.token = decodedToken;
        req.user_id = identity.user_id;
        next();
      }
    });
  }
};

module.exports = authUser;