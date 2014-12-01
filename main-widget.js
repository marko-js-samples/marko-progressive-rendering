function Widget() {
    var el = this.el;
    this.getEl('message').innerHTML = 'Behavior Attached (click me)';
    el.addEventListener('click', function() {
        el.style.backgroundColor = 'yellow';
    });
}

module.exports = Widget;