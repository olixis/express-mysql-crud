var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/user',loggedIn ,function(req, res, next) {
  res.send('respond with a user');
});

module.exports = router;

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}