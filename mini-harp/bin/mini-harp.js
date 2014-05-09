#!/usr/bin/env node
var createMiniHarp = require("mini-harp");
var parseArgs = require("minimist")(process.argv.slice(2));
var root = parseArgs._[0] || process.cwd();
var port = parseArgs.port || 4000;
console.log("Starting mini-harp on http://localhost:"+port);
var app = createMiniHarp(root);
app.listen(port);
