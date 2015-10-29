var template = require('marko').load(require.resolve('./template.marko'));

module.exports = function(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    var renderMode = req.query.renderMode || 'progressive-out-of-order';
    var jsLocation = req.query.jsLocation || 'middle';

    var viewModel = {
        renderMode: renderMode,
        jsLocation: jsLocation,
        widgetConfig: {
            renderMode: renderMode,
            jsLocation: jsLocation
        }
    };

    template.render(viewModel, res);

};
