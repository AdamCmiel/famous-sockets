function WeightedAverage(initialValue, length) {
    this.store = [initialValue];
    this.value = initialValue;
    this.register = 0;
    this.index = 0;
    this.length = length || 10;
}

WeightedAverage.prototype = {
    constructor: WeightedAverage,
    pushValue: function(n) {
        this.store.push(n);
        this.register = 0;
        if(this.store.length > this.length) this.store.shift();
        for(this.index = 0; this.index < this.store.length; this.index++)
            this.register += this.store[this.index];
        this.register /= this.store.length;
        this.value = this.register;
    },
    get: function() {
        return this.value;
    }
};

module.exports = WeightedAverage;

