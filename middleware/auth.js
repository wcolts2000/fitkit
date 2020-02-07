require('dotenv').config();
const jwt = require('jsonwebtoken');

const adminWhitelist = ['wcolts2000@gmail.com'];

module.exports = {
  generateToken: function(user) {
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email
    };

    const secret =
      process.env.JWT_SECRET ||
      'enter a secret string in the environment variables';

    const options = {
      expiresIn: '48h'
    };

    return jwt.sign(payload, secret, options);
  },
  protectedRoute: function(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: 'Invalid Token' });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      res.status(401).json({ message: 'No Token' });
    }
  },
  personalRoute: function(req, res, next) {
    const { id } = req.params;
    const tokenId = req.decodedToken.sub;
    if (tokenId == id) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  },
  admin: function(req, res, next) {
    const { email } = req.decodedToken;
    if (adminWhitelist.includes(email)) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
};
