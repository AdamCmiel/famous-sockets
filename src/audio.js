var ctx = new AudioContext();

var tone = ctx.createOscillator();
tone.type = 'triangle';
var gain = ctx.createGain();

tone.connect(gain);
gain.connect(ctx.destination);

function expon(v) {
    return (Math.exp(v) - 1) / (Math.E - 1);
}

function linear(v) {
    return v;
}

module.exports = {
    high: 440,
    low: 44,
    tune: function(v) {
        v = Math.max(v, 0);
        v = Math.min(v, 1);
        tone.frequency.value = this.low + (this.high - this.low) *  v;
    },
    gain: function(v) {
        v = Math.max(v, 0);
        v = Math.min(v, 1);
        gain.gain.value = expon(v);
    },
    start: function() {
        tone.start();
    }
};

