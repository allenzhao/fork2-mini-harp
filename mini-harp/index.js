module.exports = function createMiniHarp(root) {
    var app = require("connect")();
    var serveStatic = require("serve-static");
    var makeJade = require("./lib/processor/jade.js");
    var makeLess = require("./lib/processor/less.js");
    var path = require("path");
    app.use(function(request, response, next) {
        var extname = path.extname(request.url);
        if (request.url == "/current-time") {
            response.end((new Date()).toISOString());
        } else if (extname == '.less' || extname == '.jade') {
            response.statusCode = 404;
            response.end("404 Not Found.");
        } else {
            next();
        }
    });
    app.use(serveStatic(root));
    app.use(makeJade(root));
    app.use(makeLess(root));
    return app;

}