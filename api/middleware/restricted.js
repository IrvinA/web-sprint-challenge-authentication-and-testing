const { JWT_SECRET } = require('../secrets');
const jwt = require('jsonwebtoken');

const restricted = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next({ status: 401, message: 'Token required' });
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      next({ status: 401, message: 'Token invalid' });
    } else {
      req.decodedToken = decoded;
      next();
    }
  });
};

module.exports = {
  restricted,
};
