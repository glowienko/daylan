var express = require('express'),
    router = express.Router(),
    auth = require('../config/auth'),
    UserProfile = require('../models/UserProfile'),
    User = require('../models/User'),
    levelService = require('../helpers/level-service');
//THERE SHOULD BE SERVICES FOLDER, AND ONE SERVICE FOR ONE CONTROLLER
//LIKE IN SPRING, SERVICE LOGIC, INTERACTING WITH DB AND BETTER METHODS FROM MONGOOSE
//FOR CLEAN CODE



router.get('/userProfile', function (req, res) {
    getProfiles(res);
});

router.get('/userProfile/:owner', auth, function (req, res) {
    UserProfile.findOne({ 'owner': req.params.owner }, function (err, userProfile) {
        if (err) {
            res.send(err);
        }
        res.json(userProfile);
    });
});



router.delete('/userProfile/:owner', auth, function (req, res) {
    UserProfile.remove({
        'owner': req.params.owner
    }, function (err, userProfile) {
        if (err) {
            res.send(err);
        }
        getProfiles(res);
    });
});




router.put('/userProfile/:owner', auth, function (req, res) {
    UserProfile.findOne({ 'owner': req.params.owner },
        function (err, userProfile) {
            if (err) {
                res.send(err);
            }
            userProfile = req.body.userProfile;
            userProfile.save(function (err, userProfile) {
                if (!err) res.json(userProfile.userNotes);
            });
        });
});

router.put('/userProfile/:owner/taskDone', function (req, res, next) {
    UserProfile.findOne({ 'owner': req.params.owner }, function (err, userProfile) {
        if (err) { res.send(err); }
        userProfile.incrementTasksDone(function (err) {
            if (err) { return next(err); }
            res.json(userProfile);
        });
    });
});

router.put('/userProfile/:owner/goalAchived', auth, function (req, res, next) {
    UserProfile.findOne({ 'owner': req.params.owner }, function (err, userProfile) {
        if (err) { res.send(err); }
        userProfile.incrementGoalsAchived(function (err) {
            if (err) { return next(err); }
            res.json(userProfile);
        });
    });
});

router.put('/userProfile/:owner/addPoints', auth, function (req, res, next) {
    UserProfile.findOne({ 'owner': req.params.owner }, function (err, userProfile) {
        if (err) { res.send(err); }
        userProfile.addPoints(req.body.points, function (err) {
            if (err) { return next(err); }
            res.json(userProfile);
        });
    });
});

router.put('/userProfile/:owner/nextLevel', auth, function (req, res, next) {
    UserProfile.findOne({ 'owner': req.params.owner }, function (err, userProfile) {
        if (err) { res.send(err); }
        var oldLevel = userProfile.level;
        userProfile.level = levelService.getLevelForPoints(userProfile.points);

        var responsePayload = {
            userProfile: userProfile,
            levelsDifference: (userProfile.level - oldLevel)
        };
        userProfile.save(function (err, userProfile) {
            if (!err) res.json(responsePayload);
        });
    });
});


router.put('/userProfile/:owner/goPro', auth, function (req, res, next) {
    UserProfile.findOne({ 'owner': req.params.owner }, function (err, userProfile) {
        if (err) { res.send(err); }

        User.findOne({ 'username': req.params.owner }, function (err, user) {
            if (err) { res.send(err); }
            user.type = 'regular';
            user.save(function (err, user) { });
        });
        userProfile.ownersType = 'regular';
        userProfile.save(function (err, userProfile) {
             if (!err) { res.send(userProfile); }
         });
    });

});



function getProfiles(res) {
    UserProfile.find(function (err, profiles) {
        if (err) {
            res.send(err);
        }
        res.json(profiles);
    });
}

module.exports = router;
