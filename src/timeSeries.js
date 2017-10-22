const prototype = {
  reset() {
    this.values = [];
    return this
  },

  removeOldValues(t) {
    t = t || Date.now();

    while(this.values.length > 0) {
        if (t - this.values[0][0] <= this.msHistory) {
            break;
        }
        this.values.shift();
    }
    return this
  },
  
  addValue(v) {
    const t = Date.now();
    let dt;

    if (this.values.length) {
      let lastValue = this.values[this.values.length - 1];
      dt = t - lastValue[0];
      if (dt < 1) {
        dt = 1;
      }
    } else {
      dt = 1;
    }

    this.removeOldValues(t);
    this.values.push([t, dt, v]);
    return this
  },

  getValues() {
    return this.values;
  }
}

export default () => Object.assign(Object.create(prototype), {
  msHistory: 100,
  values: []
})