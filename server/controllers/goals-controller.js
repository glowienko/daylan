var express = require('express'),
    UserProfile = require('../models/UserProfile'),
    router = express.Router();
var auth = require('../config/auth');

router.post('/userProfile/:owner/goals', auth, function (req, res) {
    UserProfile.findOne({ 'owner': req.params.owner }, function (err, userProfile) {
        if (err) {
            res.send(err);
        }
        userProfile.userGoals.push(req.body);
        userProfile.save(function (err, userProfile) {
            if (!err) res.json(userProfile.userGoals);
        });
    });
});

router.post('/userProfile/:owner/goals/:goalId/tasks', auth, function (req, res) {
    UserProfile.findOne({ 'owner': req.params.owner }, function (err, userProfile) {
        if (err) {
            res.send(err);
        }
        var userGoal = userProfile.userGoals.id(req.params.goalId);
        userGoal.tasks.push(req.body.taskId.toString());
        userProfile.save(function (err, userProfile) {
            if (!err) res.json(userProfile);
        });
    });
});

router.delete('/userProfile/:owner/goals/:goalId', auth, function (req, res) {
    UserProfile.findOne({ 'owner': req.params.owner }, function (err, userProfile) {
        if (err) {
            res.send(err);
        }
        userProfile.userGoals.pull(req.params.goalId);
        userProfile.save(function (err, userProfile) {
            if (!err) res.json(userProfile.userGoals);
        });
    });
});


router.put('/userProfile/:owner/goals/:goalId/achived', auth, function (req, res) {
    UserProfile.findOne({ 'owner': req.params.owner }, function (err, userProfile) {
        if (err) {
            res.send(err);
        }
        userProfile.userGoals
            .filter(function (goal) {
                return goal._id === req.params.goalId;
            })
            .map(function (goal) {
                goal.achived = true;
            });

        userProfile.save(function (err, userProfile) {
            if (!err) res.json(userProfile);
        });
    });
});

router.put('/userProfile/:owner/goals/:goalId/taskDone/v2', auth, function (req, res) {
    UserProfile.findOne({ 'owner': req.params.owner }, function (err, userProfile) {
        if (err) {
            res.send(err);
        }
        var newProgress = 0.0;
        userProfile.userGoals
            .filter(function (goal) {
                return goal._id == req.params.goalId;
            })
            .map(function (goal) {
                goal.tasksDone++;
                newProgress = (goal.tasksDone / goal.tasksInProgress) * 100;
                goal.progress = newProgress;
            });

        var responsePayload = {
            progress: newProgress,
            level: userProfile.level
        };
        userProfile.save(function (err, userProfile) {
            if (!err) res.json(responsePayload);
        });
    });
});



router.put('/userProfile/:owner/goals/:goalId/tasks/inProgress/up', auth, function (req, res) {
    UserProfile.findOne({ 'owner': req.params.owner }, function (err, userProfile) {
        if (err) {
            res.send(err);
        }
        var newProgress = 0.0;
        var result = userProfile.userGoals
            .filter(function (goal) {
                return goal._id == req.params.goalId;
            })
            .map(function (goal) {
                goal.tasksInProgress++;
                newProgress = (goal.tasksDone / goal.tasksInProgress) * 100;
                goal.progress = newProgress;
            });

        userProfile.save(function (err, userProfile) {
            if (!err && result.lenght !== 0) res.json(newProgress);
            else {
                res.status(500);
                res.json(err);
            }
        });
    });
});

router.put('/userProfile/:owner/goals/:goalId/tasksInProgressDown', auth, function (req, res) {
    UserProfile.findOne({ 'owner': req.params.owner }, function (err, userProfile) {
        if (err) {
            res.send(err);
        }
        var newProgress = 0;
        userProfile.userGoals
            .filter(function (goal) {
                return goal._id == req.params.goalId;
            })
            .map(function (goal) {
                if (goal.tasksInProgress === 0) {
                    newProgress = 0;
                }
                else {
                    goal.tasksInProgress--;
                    newProgress = (goal.tasksDone / goal.tasksInProgress) * 100;
                }
                goal.progress = newProgress;
            });

        userProfile.save(function (err, userProfile) {
            if (!err) res.json(newProgress);
        });
    });
});




router.put('/userProfile/:owner/goals/customGoal/taskDone/v3', auth, function (req, res) {
    var newProgress = 0.0,
        responsePayload;

    UserProfile.findOne({ 'owner': req.params.owner }, function (err, userProfile) {
        if (err) {
            res.send(err);
        }
        userProfile.userGoals
            .filter(function (goal) {
                return goal.type === 'DoTasksGoal';
            })
            .map(function (goal) {
                goal.tasksDone++;
                newProgress = (goal.tasksDone / goal.tasksInProgress) * 100;
                goal.progress = newProgress;
            });

        responsePayload = {
            progress: newProgress,
            level: userProfile.level,
        };
        userProfile.save(function (err, userProfile) {
            if (!err) res.json(responsePayload);
            else {
                res.status(500);
                res.json(err);
            }
        });
    });
});


router.put('/userProfile/:owner/goals/customGoal/upgrade', auth, function (req, res) {
    UserProfile.findOne({ 'owner': req.params.owner }, function (err, userProfile) {
        if (err) {
            res.send(err);
        }

        userProfile.userGoals
            .filter(function (goal) {
                return goal.type === 'DoTasksGoal';
            })
            .map(function (goal) {
                goal.tasksDone = 0;
                goal.tasksInProgress = goal.tasksInProgress + (userProfile.level * 2);
                goal.progress = 0;
                goal.body = 'Finish ' + goal.tasksInProgress + ' tasks';
            });

        userProfile.save(function (err, userProfile) {
            if (!err) res.json(userProfile);
        });
    });
});

module.exports = router;