import inputTouch from 'touche/input/dom/touch';
import inputMouse from 'touche/input/dom/mouse';
import inputPointer from 'touche/input/dom/pointer';

import touchMouseFilter from 'touche/input/filters/touchMouse';
import preventSafariZoomFilter from 'touche/input/filters/preventSafariZoom';

import {
  SUPPORTS_TOUCH,
  SUPPORTS_POINTER,
  SUPPORTS_MOUSE
} from 'touche/input/capabilities'

export default function({el}) {

  let inputs = []
  let filters = []

  function useInput(inputFunction) {
    inputs.push(inputFunction)
  }

  SUPPORTS_MOUSE && useInput(inputMouse)
  SUPPORTS_TOUCH && useInput(inputTouch)
  SUPPORTS_POINTER && useInput(inputPointer)

  if (SUPPORTS_MOUSE && SUPPORTS_TOUCH) {
    filters.push(touchMouseFilter())
  }

  //filters.push(preventSafariZoomFilter(400))

  return {
    _filterCallback(inputData) {
      let legit = filters.length === 0 || filters.every((filter) => filter(inputData))
      if (legit) {
        this._callback(inputData)
      }
    },
    _callback: () => {},
    callback(fn) {
      this._callback = fn
      return this
    },
    init() {
      this._filterCallback = this._filterCallback.bind(this)
      inputs.forEach((inputFunction) => inputFunction({
        el,
        callback: this._filterCallback
      }).init().attachToElement())
    }
  }

}
