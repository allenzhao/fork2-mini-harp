module.exports = function createMiniHarp (root) {
  var app = require("connect")();
  var serveStatic = require("serve-static");
  app.use(serveStatic(root));
  app.use(function(request, response, next){
    if(request.url=="/current-time"){
      response.end((new Date()).toISOString());
    }else{
      next();
    });
    return app;
  }
