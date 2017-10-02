var template = require('./index.marko');

module.exports = function(req, res) {
    var renderMode = req.query.renderMode || 'progressive-out-of-order';
    var viewModel = {
        renderMode: renderMode
    };

    res.marko(template, viewModel);
};
