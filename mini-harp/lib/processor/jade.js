module.exports = makeJade;

function makeJade(root) {
    var app = require('connect')();
    var path = require('path');
    var fs = require('fs');
    var jade = require('jade');
    return function(request, response, next) {
        if (path.extname(request.url) == '.html') {
        fs.readFile(root + request.url.split('.')[0] + '.jade', {
                encoding: "utf8"
            },
            function(err, data) {
                if (err)
                    next();
                else {
                    jade.render(data, '', function(err, html) {
                        if (err) next();
                        else response.end(html);
                    });
                }
            });
    } else {
        next();
    }
}
// app.use(function(request, response, next) {
//     if (path.extname(request.url == '.html')) {
// fs.readFile(root + request.url.split('.')[0] + '.jade', {
//     encoding: "utf8"
// }, function(err, data) {
//             if (err)
//                 next();
//             else
//                 response.end(jade.render(data));
//         });
//     } else {
//         next();
//     }
// });
// return app;
}