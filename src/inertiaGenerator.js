import timeSeries from './timeSeries'

const prototype = {
  add(v) {
    this.series.addValue(v)
  },
  start() {
    console.log(this.series.getValues())
  },
  stop() {
    
  }
}

export default () => Object.assign(Object.create(prototype), {
  series: timeSeries()
})