
// Include the cluster module
var cluster = require('cluster');

// Code to run if we're in the master process
if (cluster.isMaster) {

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    console.log("CPUs "+cpuCount);

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    // Listen for dying workers
    cluster.on('exit', function (worker) {

        // Replace the dead worker, we're not sentimental
        console.log('Worker %d died :(', worker.id);
        cluster.fork();

    });

// Code to run if we're in a worker process
} else { 
    
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

  seneca.act({role:'movie.watcher', cmd:'moviesWatched', name:'apple'}, function(err, item) {
        console.log(item);
    });

})

}