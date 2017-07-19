var mongoose = require('mongoose'),
    GoalSchema = require('./Goal'),
    TaskSchema = require('./Task'),
    NoteSchema = require('./Note');

var UserProfileSchema = new mongoose.Schema({
    owner: { type: String },
    ownersType: {type: String},
    tasksDoneCounter: { type: Number, default: 0 },
    goalsAchivedCounter: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    userTasks: [TaskSchema],
    userGoals: [GoalSchema],
    userNotes: [NoteSchema]
});

UserProfileSchema.methods.incrementTasksDone = function (callback) {
    this.tasksDoneCounter += 1;
    this.save(callback);
};

UserProfileSchema.methods.addPoints = function (points, callback) {
    this.points += points;
    this.save(callback);
};

UserProfileSchema.methods.changeType = function (newtype, callback) {
    this.type = newtype;
    this.save(callback);
};


UserProfileSchema.methods.increaseLevel = function (callback) {
    this.level += 1;
    this.save(callback);
};

UserProfileSchema.methods.incrementGoalsAchived = function (callback) {
    this.goalsAchivedCounter += 1;
    this.save(callback);
};

module.exports = mongoose.model('UserProfile', UserProfileSchema);