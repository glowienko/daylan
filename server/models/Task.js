var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
    body: String,
    date: Date,
    time: String,
    importance: {type: Number, default: 0},
    goal_id: String
});

module.exports = TaskSchema;