var express = require('express');
var router = express.Router();

/* GET payments page. */
router.get('/', function(req, res, next) {
    res.send('payments');
});

module.exports = router;
