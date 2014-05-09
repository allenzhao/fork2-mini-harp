module.exports = function createMiniHarp (root) {
        var app = require("connect")();
        var serveStatic = require("serve-static");
        app.use(serveStatic(root));
        return app;
}
