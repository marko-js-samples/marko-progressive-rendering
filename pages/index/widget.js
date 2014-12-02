function Widget(widgetConfig) {
    var loadingEl = this.getEl('loading');
    var iframe = this.getEl('iframe');
    var loadingMessageEl = this.getEl('loadingMessage');
    var refreshButton = this.getEl('refreshButton');
    var newWindowButton = this.getEl('newWindowButton');

    var startTime;

    function refreshPage(url) {
        loadingMessageEl.innerHTML = 'Page loading...';
        loadingEl.className = 'loading';

        startTime = Date.now();
        if (typeof url !== 'string') {
            url = '/iframe?renderMode=' + widgetConfig.renderMode +
                '&jsLocation=' +  widgetConfig.jsLocation +
                '&ts=' + startTime;
        }

        var done = false;

        function handleOnload() {
            if (done) {
                return;
            }

            var elapsedTime = Date.now() - startTime;
            loadingMessageEl.innerHTML = 'Loaded in ' + elapsedTime + 'ms';
            loadingEl.className = 'loading-done';

            done = true;
            iframe.onreadystatechange = null;
            iframe.onload = null;
        }

        iframe.onreadystatechange = function() {
            if (iframe.readyState == "complete"){
                handleOnload();
            }
        };

        iframe.onload = handleOnload;


        iframe.src = url;
    }

    refreshButton.addEventListener('click', refreshPage);

    if (window.addEventListener) {
        window.addEventListener('load', refreshPage, false);
    } else if (window.attachEvent) {
        window.attachEvent('onload', refreshPage );
    }

    newWindowButton.addEventListener('click', function() {
        var url = '/iframe?renderMode=' + widgetConfig.renderMode +
            '&jsLocation=' +  widgetConfig.jsLocation;

        window.open(url, '_blank');
    });

}

module.exports = Widget;