var express = require('express'),
    UserProfile = require('../models/UserProfile'),
    router = express.Router();
var auth = require('../config/auth');

router.post('/userProfile/:owner/tasks', function (req, res) {
    UserProfile.findOne({ 'owner': req.params.owner }, function (err, userProfile) {
        if (err) {
            res.send(err);
        }
        userProfile.userTasks.push(req.body);
        userProfile.save(function (err, userProfile) {
            if (!err) res.json(userProfile.userTasks);
        });
    });
});



router.delete('/userProfile/:owner/tasks/:taskId', auth, function (req, res) {
    UserProfile.findOne({ 'owner': req.params.owner }, function (err, userProfile) {
        if (err) {
            res.send(err);
        }
        userProfile.userTasks.pull(req.params.taskId);
        userProfile.save(function (err, userProfile) {
            if (!err) res.json(userProfile);
        });
    });
});

router.delete('/userProfile/:owner/goals/:goalId/tasks/:taskId', function (req, res) {
    UserProfile.findOne({ 'owner': req.params.owner }, function (err, userProfile) {
        if (err) {
            res.send(err);
        }
        var userGoals = userProfile.userGoals.id(req.params.goalId);
        userGoals.tasks.pull(taskId);
        userProfile.save(function (err, userProfile) {
            if (!err) res.json(userProfile);
        });
    });
});


router.put('/userProfile/:owner/goals/:goalId', function (req, res) {
    UserProfile.findOne({ 'owner': req.params.owner }, function (err, userProfile) {
        if (err) {
            res.send(err);
        }
        var searchedGoal = userProfile.userGoals
            .filter(function (goal) {
                return goal._id == req.params.goalId;
            });

        res.json(searchedGoal);
    });
});

router.put('/userProfile/:owner/tasks/unpinGoal/:goalId', function(req, res){
    UserProfile.findOne({ 'owner': req.params.owner }, function (err, userProfile) {
        if (err) {
            res.send(err);
        }
        userProfile.userTasks
            .filter(function (task) {
                return task.goal_id === req.params.goalId;
            })
            .map(function (task) {
               task.goal_id = null;
            });

        userProfile.save(function (err, userProfile) {
            if (!err) res.json(userProfile.userTasks);
        });
    });
});

module.exports = router;