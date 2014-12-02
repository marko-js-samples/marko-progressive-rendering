function Widget() {
    var el = this.el;
    var messageEl = this.getEl('message');
    messageEl.innerHTML = 'Behavior Attached (click me)';
    el.addEventListener('click', function() {
        el.style.backgroundColor = '#2c3e50';
        messageEl.innerHTML = 'Clicked!';
    });
}

module.exports = Widget;