module.exports = serveRoot;

function serveRoot() {
    return function(request, response, next) {
        if (request.url == '/') {
            request.url = '/index.html';
            next();
        }
    }
}