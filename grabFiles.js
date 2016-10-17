"use strict";

var fs = require("fs");

function grabFiles( file ) {
    var dir = process.cwd().concat("/src/js/");
    var contents = fs.readFileSync(
        dir.concat(file),
        "utf-8"
    );

    return contents;
}

module.exports = grabFiles;
