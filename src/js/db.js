module.exports = pooled;

var mysql     =    require('mysql');
var connection      =    mysql.createPool({
    connectionLimit : 10, //important
    host     : 'localhost',
    user     : 'guest',
    password : 'guest',
    database : 'user_movie_demo',
    debug    :  false
});

function pooled (){
    return connection;
}
