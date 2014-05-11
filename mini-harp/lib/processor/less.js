module.exports = makeLess;

function makeLess(root) {
    var path = require('path');
    var fs = require('fs');
    var less = require('less');
    return function(request, response, next) {
        if (path.extname(request.url) == ".css") {
            var lessFile = root + request.url.split('.')[0] + ".less";
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
                            response.end(css);
                    });
            });
        } else
            next();
    };
}