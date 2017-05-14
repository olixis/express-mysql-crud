var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
      req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query('SELECT * FROM t_user',function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

            res.render('index',{title:"RESTful Crud Example",data:rows});

         });

    });
});

module.exports = router;
