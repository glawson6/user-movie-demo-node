"use strict"; 

const Seneca = require('seneca')
const SenecaWeb = require('seneca-web')
const Express = require('express')
const seneca = Seneca()
seneca.use(SenecaWeb, {
  context: Express(),
  adapter: require('seneca-web-adapter-express')
})
seneca.use( './src/js/movie_queries.js')

seneca.ready(() => {
  const app = seneca.export('web/context')();

  app.listen(3000);

  seneca.act({role:'movie.watcher', cmd:'moviesWatched', userId:'f9c7302d-3984-4fc9-9251-ed0a30517086'}, function(err, item) {
        console.log(item);
    });

})