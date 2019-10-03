const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.authenticate = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Get user by email
      const user = await User.findOne({ email });

      // Match Password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          resolve(user);
        } else {
          // Match Failed
          reject('Authentication Failed');
        }
      });
    } catch (error) {
      // Email not found
      reject('Authentication Failed');
    }
  });
};
