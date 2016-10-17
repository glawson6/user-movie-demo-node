module.exports = function (options) {
    var seneca = this;

    //var dbPool = require("./db.js");
    var pool = require("./db.js")();

    seneca.add({role: 'movie.watcher', cmd: 'moviesWatched'}, moviesWatched);
    //seneca.add({role:'inventory', cmd:'create_item', create_item);
    //... other action definitions

    /*
     var mysql     =    require('mysql');
     var pool      =    mysql.createPool({
     connectionLimit : 10, //important
     host     : 'localhost',
     user     : 'guest',
     password : 'guest',
     database : 'user_movie_demo',
     debug    :  false
     });
     */


    function moviesWatched(args, done) {

        console.log("Args => " + JSON.stringify(args.userId));
        var moviesWatchedQuery = "select mv.movieid, mv.name, mr.rating, g.name as genre from movie_rating mr " +
            "join movie mv on mv.movieid = mr.movieid " +
            "join genre g on g.genreid = mv.genreid " +
            "join user usr1 on usr1.userid = mr.userid " +
            "where usr1.userid = ? ";
        // ... perform find
        pool.getConnection(function (err, connection) {
            if (err) {
                done(err);
            }

            console.log('connected as id ' + connection.threadId);

            connection.query(moviesWatchedQuery, [args.userId], function (err, rows) {
                connection.release();
                if (!err) {
                    //console.log("Rows " + JSON.stringify(rows));
                    done(null, rows);
                }
            });

            connection.on('error', function (err) {
                console.log("error " + err);
                done(err);
            });
        });


        //done(null, moviesWatched);
    }

    /*
     function create_item(args, done) {
     var itemName = args.name;
     // ... perform item creation
     done(null, item);
     }
     */
}
