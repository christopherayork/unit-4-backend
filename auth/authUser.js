const jwt = require('jsonwebtoken');
const secrets = require('./secrets');

const authUser = async (req, res, next) => {
  let auth = req.headers.token;
  if(!auth) res.status(400).json({ message: 'Token required' });
  else {
    jwt.verify(auth, secrets.jwtSecret, (err, decodedToken) => {
      if(err) res.status(400).json({ message: 'Invalid token' });
      else {
        req.user = decodedToken;
        next();
      }
    });
  }
};

module.exports = authUser;