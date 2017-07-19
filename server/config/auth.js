var jwt = require('express-jwt'),
    auth = jwt({
        secret: 'secret',
        userProperty: 'payload'
    });

module.exports = auth;