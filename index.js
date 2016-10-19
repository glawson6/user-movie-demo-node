"use strict";

const Seneca = require('seneca');
const SenecaWeb = require('seneca-web');
const Express = require('express');
const seneca = Seneca();
var app = Express();

seneca.use(SenecaWeb, {
    context: app,
    adapter: require('seneca-web-adapter-express')
});

// Service
seneca.use('./src/js/MovieService.js');

seneca.ready(function(){
    /*
     const senecaApp = seneca.export('web/context')();
     senecaApp.listen(3000);
     */
    console.log("PORT "+process.env.PORT);
    app.listen(process.env.PORT);

    /*
     seneca.act({role:'movie.watcher', cmd:'moviesWatched', userId:'f9c7302d-3984-4fc9-9251-ed0a30517086'}, function(err, item) {
     console.log(item);
     });
     */

    app.get('/api/movie/watched/:id', function (req, res) {
        seneca.act({role: 'movie.watcher', cmd: 'moviesWatched', userId: req.params.id}, function (err, item) {
            res.json(item);
        });
    });

    app.get('/api/movie/:id/averageRating', function (req, res) {
        seneca.act({role: 'movie.watcher', cmd: 'averageRating', movieId: req.params.id}, function (err, item) {
            res.json(item);
        });
    });

    app.get('/api/movie/top/:genre/:id', function (req, res) {
        seneca.act({role: 'movie.watcher', cmd: 'topMovies', userId: req.params.id, genre:req.params.genre}, function (err, item) {
            res.json(item);
        });
    });

});


