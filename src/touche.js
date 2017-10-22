import inputEvents from 'touche/input/dom'; 

import createVirtualInput from 'touche/input/virtual';
import createManager from 'touche/manager'

import inertiaGenerator from 'touche/inertiaGenerator'

function touche(el, options = {}) {
  
  const input = inputEvents({el})
  const manager = createManager()

  manager
    .hash(function(data, sessions) {
      return 0
    })
    .addInput(input)
  
  return manager
}

Object.assign(touche, {
  gestures: {
    tap: require('touche/gestures/tap').default,
    press: require('touche/gestures/press').default,
    swipe: require('touche/gestures/swipe').default,
    pan: require('touche/gestures/pan').default,
    pinch: require('touche/gestures/pinch').default,
    rotate: require('touche/gestures/rotate').default,
    filter: require('touche/gestures/filter').default,
  },
  input: {
    virtual: require('touche/input/virtual').default,
  },
  inertiaGenerator
})

export default touche;