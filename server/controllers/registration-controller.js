var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    UserProfile = require('../models/UserProfile'),
    User = require('../models/User'),
    GoalSchema = require('../models/Goal'),
    Goal = mongoose.model('Goal', GoalSchema);

router.post('/registration', function (req, res, next) {

    var user = getNewUser(req);
    var userProfile = getNewUserProfile(user.username, user.type);

    if (!req.body.username || !req.body.password) {
        return res.status(400).json({
            message: 'Please fill out all fields'
        });
    }
    user.save(function (err) {
        if (err) {
            res.status(403);
            return res.json({ message: 'This login is unavailable' });
        }
        else {
            userProfile.save(function (err) {
                if (err) {
                    return res.json({ message: 'Cannot save userProfile, error: ' + err });
                }
                return res.json({
                    token: user.generateJWT(),
                    userProfile: userProfile
                });
            });
        }
    });
});

function getNewUser(req) {
    var user = new User();
    user.username = req.body.username;
    user.setPassword(req.body.password);
    user.setType(req.body.type);
    user.setEmail(req.body.email);
    user.setName(req.body.name);

    return user;
}

function getNewUserProfile(username, type) {
    var userProfile = new UserProfile();
    userProfile.owner = username;
    userProfile.ownersType = type;
    userProfile.userGoals.push(getDefaultGoal());
    return userProfile;
}

function getDefaultGoal() {

    var doTwoTasks = new Goal();
    doTwoTasks.type = 'DoTasksGoal';
    doTwoTasks.body = 'Finish 2 tasks';
    doTwoTasks.tasksInProgress = 2;

    return doTwoTasks;
}

module.exports = router;