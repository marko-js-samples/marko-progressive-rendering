require('marko/express');
require('marko/node-require');

var express = require('express');
var serveStatic = require('serve-static');
var compression = require('compression');

var app = express();
var port = process.env.PORT || 8080;

var isProduction = process.env.NODE_ENV === 'production';

require('lasso').configure({
    plugins: [
        'lasso-marko' // Allow Marko templates to be compiled and transported to the browser
    ],
    outputDir: __dirname + '/static',
    bundlingEnabled: isProduction,
    minify: isProduction,
    fingerprintsEnabled: isProduction,
});

app.use(compression()); // Enable gzip compression for all HTTP responses
app.use(require('lasso/middleware').serveStatic());

app.get('/iframe', require('./pages/iframe'));
app.get('/', require('./pages/index'));

app.listen(port, function() {
    console.log('Server started! Try it out:\nhttp://localhost:' + port + '/');

    if (process.send) {
        process.send('online');
    }
});
