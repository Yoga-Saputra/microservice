var express = require('express');
var router = express.Router();

/* GET order page. */
router.get('/', function(req, res, next) {
    res.send('orders');
});

module.exports = router;
