
require('marko/compiler').defaultOptions.preserveWhitespace = true;

var express = require('express');
var serveStatic = require('serve-static');
var compression = require('compression');

var template = require('marko').load(require.resolve('./template.marko'));
var app = express();
var port = process.env.PORT || 8080;


app.use(compression()); // Enable gzip compression for all HTTP responses
app.use('/static', serveStatic(__dirname + '/static'));

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    var reorder = req.query.bigpipe != null || req.query.reorder != null;

    template.render({
            headerDataProvider: function(args, callback) {
                setTimeout(callback, args.delay);
            },
            navDataProvider: function(args, callback) {
                setTimeout(callback, args.delay);
            },
            mainDataProvider: function(args, callback) {
                setTimeout(callback, args.delay);
            },
            footerDataProvider: function(args, callback) {
                setTimeout(callback, args.delay);
            },
            reorderEnabled: reorder
        }, res);
});

app.listen(port, function() {
    console.log('Server started! Try it out:\nhttp://localhost:' + port + '/');

    if (process.send) {
        process.send('online');
    }
});
