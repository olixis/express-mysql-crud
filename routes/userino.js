var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/userino', function(req, res, next) {
  res.send('respond with a userino');
});

module.exports = router;
