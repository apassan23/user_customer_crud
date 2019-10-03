const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../auth');
const config = require('../config');

module.exports = app => {
  // Register User
  app.post('/register', (req, res) => {
    const { email, password } = req.body;

    const user = new User({
      email,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        try {
          const newUser = user.save();
          res.status(201).json({ msg: 'Registered' });
        } catch (error) {
          res.status(400).json({ msg: 'Error' });
        }
      });
    });
  });

  app.post('/auth', async (req, res) => {
    const { email, password } = req.body;

    try {
      // Authenticate User
      const user = await auth.authenticate(email, password);

      // Create JWT
      const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
        expiresIn: '15m'
      });

      const { iat, exp } = jwt.decode(token);

      // Send Response(Token)
      res.status(200).json({ iat, exp, token });
    } catch (error) {
      // Authentication Failed Somehow
      res.status(401).json({ msg: 'Unauthorized', err: error });
    }
  });
};
