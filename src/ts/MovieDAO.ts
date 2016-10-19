var pool = require("./db.js")();
var _ = require("underscore");

const moviesWatchedQuery = "select mv.movieid, mv.name, mr.rating, g.name as genre from movie_rating mr " +
    "join movie mv on mv.movieid = mr.movieid " +
    "join genre g on g.genreid = mv.genreid " +
    "join user usr1 on usr1.userid = mr.userid " +
    "where usr1.userid = ? ";

const averageRatingQuery = "SELECT AVG(m.rating) FROM movie_rating m WHERE m.movieid = ?";

const topMoviesQuery =  "select mv.movieid, mv.name, avg(mr.rating) as avg, g.name as genre from movie_rating mr " +
    "join movie mv on mv.movieid = mr.movieid " +
    "join (select gen.genreid, gen.name from genre gen where gen.name = ?) g on g.genreid = mv.genreid " +
    "join user usr1 on usr1.userid = ? " +
    "join (select ur.age, ur.name, ur.userid from user ur where ur.userid != ? ) usr2 on usr2.userid = mr.userid " +
    "where usr2.age >= (usr1.age-5) and usr2.age <= (usr1.age+5) " +
    "GROUP by mr.movieid " +
    "ORDER BY avg DESC";

    interface MovieDAO{
    watchedMovies(userId: String, callback: any);
}

class MovieDAOImpl{

    constructor(){
        console.log("Initializing ConsoleDisplay.....");
    }

    watchedMovies(userId,callback){
        pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            }


            console.log('connected as id ' + connection.threadId);

            connection.query(moviesWatchedQuery, [userId], function (err, rows) {
                connection.release();
                if (!err) {
                    //console.log("Rows " + JSON.stringify(rows));

                    callback(null,{ moviesWatched:rows, totalCount:rows.length, userId:userId});
                }
            });

            connection.on('error', function (err) {
                //console.log("error " + err);
                callback(err);
            });
        });
    }

    averageRating(movieId,callback){
        pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            }

            console.log('connected as id ' + connection.threadId);

            connection.query(averageRatingQuery, [movieId], function (err, rows) {
                connection.release();
                if (!err) {
                    console.log("Rows " + JSON.stringify(rows));
                    var rating = (_.toArray(rows[0]))[0];
                    console.log("Rating " + JSON.stringify(rating));
                    callback(null,{ averageRating:rating});
                }
            });

            connection.on('error', function (err) {
                console.log("error " + err);
                callback(err);
            });
        });
    }

    topMovies(genre,userId,callback){
        pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            }

            console.log('connected as id ' + connection.threadId);

            connection.query(topMoviesQuery, [genre, userId, userId], function (err, rows) {
                connection.release();
                if (!err) {
                    console.log("Rows " + JSON.stringify(rows));

                    callback(null,rows);
                }
            });

            connection.on('error', function (err) {
                console.log("error " + err);
                callback(err);
            });
        });
    }
}

export = MovieDAOImpl;
