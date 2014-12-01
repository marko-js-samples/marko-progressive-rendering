
require('marko/compiler').defaultOptions.preserveWhitespace = true;

var express = require('express');
var serveStatic = require('serve-static');
var compression = require('compression');

var template = require('marko').load(require.resolve('./template.marko'));
var app = express();
var port = process.env.PORT || 8080;


app.use(compression()); // Enable gzip compression for all HTTP responses

app.use('/static', function(req, res, next) {
    setTimeout(next, 200);
});

app.use('/static', serveStatic(__dirname + '/static'));

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    var renderMode = req.query.renderMode || 'progressive-out-of-order';
    var jsLocation = req.query.jsLocation || 'middle';
    var reorder = renderMode === 'progressive-out-of-order';

    var viewModel = {
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
            renderMode: renderMode,
            reorderEnabled: reorder,
            jsLocation: jsLocation
        };

    if (renderMode === 'single-chunk') {
        template.render(viewModel, function(err, html) {
            if (err) {
                res.end(err.toString());
                return;
            }
            res.end(html);
        });
    } else {
        template.render(viewModel, res);
    }

});

app.listen(port, function() {
    console.log('Server started! Try it out:\nhttp://localhost:' + port + '/');

    if (process.send) {
        process.send('online');
    }
});
