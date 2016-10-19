module.exports = pooled;

var mysql     =    require('mysql');
const url = require('url');
var connection = undefined;

if (process.env.DATABASE_URL) {
    var urlObject = url.parse(process.env.DATABASE_URL);
    console.log("urlObject "+JSON.stringify(urlObject));
    connection = mysql.createPool({
        connectionLimit: 10, //important
        host: urlObject.hostname,
        user: urlObject.auth.split(":")[0],
        password: urlObject.auth.split(":")[1],
        database: urlObject.path.substring(1),
        debug: false
    });
} else {
    const EventEmitter = require('events');
    const ee = new EventEmitter();
    ee.emit('error', new Error('DATABASE_URL has not been set as an environment variable'));
}

function pooled (){
    return connection;
}
