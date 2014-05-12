module.exports = dropStupidRequest;

function dropStupidRequest() {
    var path = require('path');
    return function(request, response, next) {
        var extname = path.extname(request.url);
        if (extname == '.jade' || extname == '.less') {
            response.statusCode = 404;
            response.end('ERROR:404 NOT FOUND. PLEASE TRY AGAIN');
        } else {
            next();
        }
    }
}