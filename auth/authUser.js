const jwt = require('jsonwebtoken');
const secrets = require('./secrets');
const userDB = require('../users/users-model');

const authUser = (req, res, next) => {
  let auth = req.headers.token;
  if(!auth) res.status(400).json({ message: 'Token required' });
  else {
    jwt.verify(auth, secrets.jwtSecret, async (err, decodedToken) => {
      if(err) res.status(400).json({ message: 'Invalid token' });
      else {
        req.user_id = decodedToken.subject;
        next();
      }
    });
  }
};

module.exports = authUser;