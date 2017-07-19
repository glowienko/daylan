var LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    User = require('../models/User');

module.exports = function(passport) {
passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrenct password' });
            }
            return done(null, user);
        });
    }
));

};