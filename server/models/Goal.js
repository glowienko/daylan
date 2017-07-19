var mongoose = require('mongoose');

var GoalSchema = new mongoose.Schema({
    body: String,
    type: String,
    progress: { type: Number, default: 0 },
    achived: { type: Boolean, default: false },
    tasksDone: { type: Number, default: 0 },
    tasksInProgress: {type: Number, default: 0},
    tasks: [String] //for now not used, we know only number of tasks in prograss and tasked achived
});

GoalSchema.methods.changeProgress = function (newProgress, callback) {
    this.progress = newProgress;
    this.save(callback);
};

GoalSchema.methods.changeAchived = function (newAchived, callback) {
    this.achived = newAchived;
    this.save(callback);
};

GoalSchema.methods.incrementTaskDone = function(callback) {
    this.tasksDone += 1;
    this.save(callback);
};

GoalSchema.methods.incrementTasksInProgress = function(callback) {
    this.tasksInProgress += 1;
    this.save(callback);
};

GoalSchema.methods.decrementTasksInProgress = function(callback) {
    this.tasksInProgress -= 1;
    this.save(callback);
};

module.exports = GoalSchema;

