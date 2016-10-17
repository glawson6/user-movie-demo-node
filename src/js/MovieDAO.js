"use strict";
var pool = require("./db.js")();
var moviesWatchedQuery = "select mv.movieid, mv.name, mr.rating, g.name as genre from movie_rating mr " +
    "join movie mv on mv.movieid = mr.movieid " +
    "join genre g on g.genreid = mv.genreid " +
    "join user usr1 on usr1.userid = mr.userid " +
    "where usr1.userid = ? ";
var MovieDAOImpl = (function () {
    function MovieDAOImpl() {
        console.log("Initializing ConsoleDisplay.....");
    }
    MovieDAOImpl.prototype.watchedMovies = function (userId, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            }
            console.log('connected as id ' + connection.threadId);
            connection.query(moviesWatchedQuery, [userId], function (err, rows) {
                connection.release();
                if (!err) {
                    callback(null, rows);
                }
            });
            connection.on('error', function (err) {
                console.log("error " + err);
                callback(err);
            });
        });
    };
    return MovieDAOImpl;
}());
module.exports = MovieDAOImpl;
