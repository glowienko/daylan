var express = require('express'),
    UserProfile = require('../models/UserProfile'),
    router = express.Router();
var auth = require('../config/auth');

router.post('/userProfile/:owner/notes', auth, function (req, res) {
    UserProfile.findOne({ 'owner': req.params.owner }, function (err, userProfile) {
        if (err) {
            res.send(err);
        }
        userProfile.userNotes.push(req.body);
        userProfile.save(function (err, userProfile) {
            if (!err) res.json(userProfile.userNotes);
        });
    });
});

router.delete('/userProfile/:owner/notes/:noteId', auth, function (req, res) {
    UserProfile.findOne({ 'owner': req.params.owner }, function (err, userProfile) {
        if (err) {
            res.send(err);
        }
        userProfile.userNotes.pull(req.params.noteId);
        userProfile.save(function (err, userProfile) {
            if (!err) res.json(userProfile.userNotes);
        });
    });
});






module.exports = router;