var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    UserProfile = require('../models/UserProfile');

router.post('/login', function(req, res, next) {
    
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({
            message: 'Please fill out all fields'
        });
    }
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (user) {
            UserProfile.findOne({ owner: user.username }, function(err, result) {
                if (err) {
                    return next(err);
                }
                return res.json({
                    token: user.generateJWT(),
                    userProfile: result
                });
            });
        }
        else {
            return res.status(401).json(info);
        }
    })(req, res, next);
});

module.exports = router;