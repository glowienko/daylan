var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({  
    body: String,
    title: String,
    uploadDate: { type: Date, default: Date.now }
});

module.exports = NoteSchema;