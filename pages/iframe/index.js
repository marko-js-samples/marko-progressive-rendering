var template = require('./index.marko');

module.exports = function(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    var renderMode = req.query.renderMode || 'progressive-out-of-order';
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
        reorderEnabled: reorder
    };

    if (renderMode === 'single-chunk') {
        template.render(viewModel, function(err, result) {
            if (err) {
                res.end(err.toString());
                return;
            }

            res.end(result.getOutput());
        });
    } else {
        template.render(viewModel, res);
    }
};
