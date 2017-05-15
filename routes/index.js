var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
    req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        var query = conn.query('SELECT * FROM t_user', function (err, rows) {

            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            res.render('index', { title: "RESTful Crud Example", data: rows });

        });

    });
});

router.get('/login', function (req, res, next) {
    req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        var query = conn.query('SELECT * FROM t_user', function (err, rows) {

            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            res.render('login', {});

        });

    });
});


router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), function (req, res, next) {
    req.getConnection(function (err, conn) {
        if (err) return next("Cannot Connect");

        var query = conn.query('SELECT * FROM t_user', function (err, rows) {

            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            res.render('index', { title: "RESTful Crud Example", data: rows });

        });

    });
});

module.exports = router;
