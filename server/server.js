// set up ======================================================================
var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),			                    // mongoose for mongodb
    db_config = require('./config/database'), 		            // load the database config
    server_config = require('./config/server'),
    passport = require('passport'), 
    morgan = require('morgan'),
    bodyParser = require('body-parser'),                        // body parser for json 
    methodOverride = require('method-override');

// configuration ===============================================================
mongoose.connect(db_config.db_url); 	                        // Connect to local MongoDB instance.

app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ 'extended': 'true' }));         // parse application/x-www-form-urlencoded
app.use(express.static(__dirname + server_config.statics_src_public_dirname));
app.use(express.static(__dirname + server_config.statics_components_dirname));
app.use(morgan('dev'));                                         // log every request to the console
app.use(methodOverride('X-HTTP-Method-Override'));              // override with the X-HTTP-Method-Override header in the request
require('./config/passport')(passport);
app.use(passport.initialize());

app.use(require('./controllers/goals-controller'));
app.use(require('./controllers/index'));
app.use(require('./controllers/login-controller'));
app.use(require('./controllers/notes-controller'));
app.use(require('./controllers/registration-controller'));
app.use(require('./controllers/tasks-controller'));
app.use(require('./controllers/user-profile-controller'));


app.listen(server_config.port, () => {
    console.log(" HTTP server is listening on port: " + server_config.port);
});