module.exports = makeLess;

function makeLess(root) {
    var path = require('path');
    var fs = require('fs');
    var less = require('less');
    return function(request, response, next) {
        if (path.extname(request.url) == ".css") {
            var lessFile = root + request.url.split('.')[0] + ".less";
            var cssFile = root + request.url;
            var cssExists = fs.exists(cssFile, function(exists) {
                if (exists) {
                    fs.readFile(cssFile, {
                            encoding: "utf8"
                        },
                        function(err, data) {
                            if (err)
                                next();
                            else {
                                response.writeHead(200, {
                                    'Content-Length': data.length,
                                    'Content-Type': 'text/css; charset=UTF-8',
                                });
                                response.end(data);
                            }
                        });
                } else {
                    fs.readFile(lessFile, {
                        encoding: "utf-8"
                    }, function(err, data) {
                        if (err)
                            next();
                        else
                            less.render(data, function(error, css) {
                                if (err)
                                    next();
                                else
                                    response.writeHead(200, {
                                        'Content-Length': css.length,
                                        'Content-Type': 'text/css; charset=UTF-8',
                                    });
                                response.end(css);
                            });
                    });
                }
            });

        } else
            next();
    };
}