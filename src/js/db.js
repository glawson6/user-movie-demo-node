module.exports = function(options) {

    var mysql     =    require('mysql');
  var pool      =    mysql.createPool({
    connectionLimit : 10, //important
    host     : 'localhost',
    user     : 'guest',
    password : 'guest',
    database : 'user_movie_demo',
    debug    :  false
});

 

  return pool;
}