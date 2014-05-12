module.exports = makeJade;

function makeJade(root) {
    var path = require('path');
    var fs = require('fs');
    var jade = require('jade');
    return function(request, response, next) {
        if (path.extname(request.url) == '.html' || request.url == '/') {
            var jadeFile = root + request.url.split('.')[0] + '.jade';
            var htmlFile = root + request.url;
            if (request.url == '/') {
                jadeFile = root + '/index.jade';
                htmlFile = root + '/index.html';
            }
            var htmlExists = fs.exists(htmlFile, function(exists) {
                if (exists) {
                    fs.readFile(htmlFile, {
                            encoding: "utf8"
                        },
                        function(err, data) {
                            if (err)
                                next();
                            else {
                                response.writeHead(200, {
                                    'Content-Length': data.length,
                                    'Content-Type': 'text/html; charset=UTF-8'
                                });
                                response.end(data);
                            }
                        });
                } else {
                    fs.readFile(jadeFile, {
                            encoding: "utf8"
                        },
                        function(err, data) {
                            if (err)
                                next();
                            else {
                                jade.render(data, '', function(err, html) {
                                    if (err) next();
                                    else {
                                        response.writeHead(200, {
                                            'Content-Length': html.length,
                                            'Content-Type': 'text/html; charset=UTF-8',
                                        });
                                        response.end(html);
                                    }
                                });
                            }
                        });
                }
            });
        } else {
            next();
        }
    };
}