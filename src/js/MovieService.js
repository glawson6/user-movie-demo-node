module.exports = function (options) {
    var seneca = this;

    //var dbPool = require("./db.js");
    //var pool = require("./db.js")();

    var MovieDAO = require("./MovieDAO.js");

    // Bind Seneca to local functions
    seneca.add({role: 'movie.watcher', cmd: 'moviesWatched'}, moviesWatched);
    seneca.add({role: 'movie.watcher', cmd: 'averageRating'}, averageRating);
    seneca.add({role: 'movie.watcher', cmd: 'topMovies'}, topMovies);

    function moviesWatched(args, done) {
        console.log("Args => " + JSON.stringify(args));
        var movieDAO = new MovieDAO();
        movieDAO.watchedMovies(args.userId, done);
    }

    function averageRating(args, done) {
        console.log("Args => " + JSON.stringify(args));
        var movieDAO = new MovieDAO();
        movieDAO.averageRating(args.movieId, done);
    }

    function topMovies(args, done) {
        console.log("Args => " + JSON.stringify(args));
        var movieDAO = new MovieDAO();
        movieDAO.topMovies(args.genre, args.userId, done);
    }

}
