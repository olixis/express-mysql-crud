var dao = {};

 dao.deserialize = (pool,queryString,params,cb) => {
 
  pool.getConnection(function (err, conn) {
    if (err)  cb(err);
    var query = conn.query(queryString, params, function (err, rows) {
      if (err) {
        console.log(err);
        cb(null, false);
      }
      //if user not found
      if (rows.length < 1)
        cb(null, false);
      cb(null, rows[0]);
    });
  });
}



module.exports = dao;