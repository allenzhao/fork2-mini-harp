module.exports = function createMiniHarp(root) {
    var app = require("connect")();
    var serveStatic = require("serve-static");
    var makeJade = require("./lib/processor/jade.js");
    var makeLess = require("./lib/processor/less.js");
    var path = require("path");
    app.use(serveStatic(root));
    app.use(function(request, response, next) {
        if (request.url == "/current-time") {
            response.end((new Date()).toISOString());
        } else {
            next();
        }
    });
    app.use(makeJade(root));
    app.use(makeLess(root));
    return app;

}