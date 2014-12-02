
require('marko/compiler').defaultOptions.preserveWhitespace = true;

var express = require('express');
var serveStatic = require('serve-static');
var compression = require('compression');

var app = express();
var port = process.env.PORT || 8080;

app.use(compression()); // Enable gzip compression for all HTTP responses

app.use('/static', function(req, res, next) {
    setTimeout(next, 200);
});

app.use('/static', serveStatic(__dirname + '/static', {
    lastModified: false
}));

app.get('/iframe', require('./pages/iframe'));

app.get('/', require('./pages/index'));

app.listen(port, function() {
    console.log('Server started! Try it out:\nhttp://localhost:' + port + '/');

    if (process.send) {
        process.send('online');
    }
});
