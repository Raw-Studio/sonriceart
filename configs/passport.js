const LocalStrategy = require('passport-local').Strategy;
const { comparePassword } = require('../helpers/bcrypt');

// Load User model
const User = require('../models/admin.model');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }
        else {
          // Match password
          if (comparePassword(password, user.password)) {
            return done(null, user);
          }
          else {
            return done(null, false, { message: 'Password incorrect' });
          }
        }
      });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};