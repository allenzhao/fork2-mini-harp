#!/usr/bin/env node
var createMiniHarp = require("mini-harp")
  , app = createMiniHarp();
var parseArgs = require("minimist")(process.argv.slice(2));
var port = parseArgs.port || 4000;
console.log("Starting mini-harp on http://localhost:"+port);
app.listen(port);
app.use(function(request, response, next){
	if(request.url=="/current-time"){
		response.end((new Date()).toISOString());
	}else{
		next();
	}
});
