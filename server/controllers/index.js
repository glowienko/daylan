
var express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    res.sendFile('index.html', {
        root: '/zzz_projekt_opa/client/src'
    });
});

module.exports = router;